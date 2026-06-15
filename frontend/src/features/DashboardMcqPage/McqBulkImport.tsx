'use client';

import React, { useState, useRef, useMemo } from 'react';
import { Button, DialogContent, Dialog, DialogHeader, DialogTitle, Heading2, Input, Para, SelectContent, SelectItem, Select, SelectTrigger, SelectValue, Textarea, toast } from '@muzammil328/ui';
import { Upload, Download, X, CheckCircle2, Loader2, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { StatusEnum, DifficultyEnum } from '@muzammil328/education-packages/enums';
import {
  useDropdownClasses,
  useDropdownBooks,
  useDropdownChapters,
  useDropdownHeadings,
  useDropdownSubHeadings,
  useCreateMcqs,
} from '@/hooks';

// ─── types ───────────────────────────────────────────────────────────────────

interface ParsedQuestion {
  question: string;
  options: string[];
  correctOption: number;
}

interface DraftQuestion extends ParsedQuestion {
  classId: string;
  bookId: string;
  chapterId: string;
  headingId: string;
  subHeadingId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
  status: 'active' | 'inactive';
  submitted: boolean;
  submitting: boolean;
  error: string;
  expanded: boolean;
}

// ─── CSV parser ───────────────────────────────────────────────────────────────

function parseCsvLine(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === delimiter && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCsv(text: string): ParsedQuestion[] {
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) throw new Error('CSV must have a header row and at least one data row');

  // detect delimiter: tab-separated (pasted from spreadsheets) vs comma-separated CSV
  const delimiter = lines[0].includes('\t') ? '\t' : ',';

  const headers = parseCsvLine(lines[0], delimiter).map(h => h.toLowerCase().replace(/\s+/g, '_'));

  const nameIdx = headers.indexOf('name');
  const correctIdx = headers.indexOf('correct_option');
  if (nameIdx === -1) throw new Error('Missing column: name');
  if (correctIdx === -1) throw new Error('Missing column: correct_option');

  const optionCols: number[] = [];
  for (let i = 1; i <= 6; i++) {
    const idx = headers.indexOf(`option${i}`);
    if (idx !== -1) optionCols.push(idx);
  }
  if (optionCols.length < 2) throw new Error('Need at least option1 and option2 columns');

  const questions: ParsedQuestion[] = [];

  for (let r = 1; r < lines.length; r++) {
    const cells = parseCsvLine(lines[r], delimiter);
    const question = cells[nameIdx] || '';
    if (!question) continue;

    const options = optionCols
      .map(idx => cells[idx] || '')
      .filter(o => o.trim() !== '');

    if (options.length < 2) continue;

    const rawCorrect = (cells[correctIdx] || '1').trim();
    // support "1"-based index, letter A/B/C/D/E/F, or the full text of the correct option
    let correctOption = 0;
    if (/^[a-fA-F]$/.test(rawCorrect)) {
      correctOption = rawCorrect.toUpperCase().charCodeAt(0) - 65;
    } else if (/^\d+$/.test(rawCorrect)) {
      correctOption = Math.max(0, parseInt(rawCorrect, 10) - 1);
    } else {
      const matchIdx = options.findIndex(o => o.toLowerCase() === rawCorrect.toLowerCase());
      correctOption = matchIdx === -1 ? 0 : matchIdx;
    }

    if (correctOption >= options.length) correctOption = 0;

    questions.push({ question, options, correctOption });
  }

  return questions;
}

// ─── template download ────────────────────────────────────────────────────────

function downloadTemplate() {
  const rows = [
    ['name', 'correct_option', 'option1', 'option2', 'option3', 'option4', 'option5', 'option6'],
    ['What is 2 + 2?', '2', '3', '4', '5', '6', '', ''],
    ['Capital of Pakistan?', '1', 'Islamabad', 'Lahore', 'Karachi', '', '', ''],
    ['Water chemical formula?', '3', 'CO2', 'O2', 'H2O', 'H2', 'NaCl', ''],
  ];
  const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mcq-bulk-template.csv';
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Dropdowns hook (shared) ──────────────────────────────────────────────────

function useDropdowns() {
  const { data: classesData } = useDropdownClasses(true);
  const { data: booksData } = useDropdownBooks(undefined, { enabled: true });
  const { data: chaptersData } = useDropdownChapters(undefined, { enabled: true });
  const { data: headingsData } = useDropdownHeadings(undefined, { enabled: true });
  const { data: subHeadingsData } = useDropdownSubHeadings(undefined, { enabled: true });

  const classes = useMemo(
    () => (classesData || []).map(i => ({ value: i.value || '', label: i.label || '' })),
    [classesData]
  );
  const books = useMemo(
    () => (booksData || []).map(i => ({ value: i.value || '', label: i.label || '' })),
    [booksData]
  );
  const chapters = useMemo(
    () => (chaptersData || []).map(i => ({ value: i.value || '', label: i.label || '' })),
    [chaptersData]
  );
  const headings = useMemo(
    () => (headingsData || []).map(i => ({ value: i.value || '', label: i.label || '' })),
    [headingsData]
  );
  const subHeadings = useMemo(
    () => (subHeadingsData || []).map(i => ({ value: i.value || '', label: i.label || '' })),
    [subHeadingsData]
  );

  return { classes, books, chapters, headings, subHeadings };
}

// ─── Single question card inside drawer ──────────────────────────────────────

interface QuestionCardProps {
  index: number;
  draft: DraftQuestion;
  onChange: (index: number, patch: Partial<DraftQuestion>) => void;
  onSubmitOne: (index: number) => void;
  dropdowns: ReturnType<typeof useDropdowns>;
}

function QuestionCard({ index, draft, onChange, onSubmitOne, dropdowns }: QuestionCardProps) {
  const { classes, books, chapters, headings, subHeadings } = dropdowns;

  if (draft.submitted) {
    return (
      <div className="border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 rounded-lg px-4 py-3 flex items-center gap-3">
        <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
        <Para className="text-sm text-green-800 dark:text-green-300 line-clamp-1 flex-1">
          <span className="font-medium">Q{index + 1}:</span> {draft.question}
        </Para>
        <span className="text-xs text-green-600 dark:text-green-400 font-medium">Saved</span>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* header */}
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-3 bg-muted/40 hover:bg-muted/70 transition-colors text-left"
        onClick={() => onChange(index, { expanded: !draft.expanded })}
      >
        <span className="text-sm font-medium text-foreground line-clamp-1 flex-1 pr-4">
          Q{index + 1}: {draft.question}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          {draft.error && <span className="text-xs text-red-500">Error</span>}
          {draft.expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {draft.expanded && (
        <div className="px-4 py-4 space-y-4">
          {/* question text */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Question</label>
            <Textarea
              value={draft.question}
              onChange={e => onChange(index, { question: e.target.value })}
              rows={2}
              className="text-sm"
            />
          </div>

          {/* options */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Options <span className="normal-case text-muted-foreground">(radio = correct answer)</span>
            </label>
            <div className="space-y-2">
              {draft.options.map((opt, oi) => (
                <div key={oi} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`correct-${index}`}
                    checked={draft.correctOption === oi}
                    onChange={() => onChange(index, { correctOption: oi })}
                    className="w-4 h-4 shrink-0"
                  />
                  <Input
                    value={opt}
                    onChange={e => {
                      const newOpts = [...draft.options];
                      newOpts[oi] = e.target.value;
                      onChange(index, { options: newOpts });
                    }}
                    placeholder={`Option ${oi + 1}`}
                    className="flex-1 h-8 text-sm"
                  />
                  {draft.options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newOpts = draft.options.filter((_, i) => i !== oi);
                        const newCorrect = draft.correctOption >= newOpts.length ? 0 : draft.correctOption;
                        onChange(index, { options: newOpts, correctOption: newCorrect });
                      }}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {draft.options.length < 6 && (
              <button
                type="button"
                onClick={() => onChange(index, { options: [...draft.options, ''] })}
                className="mt-1 flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <Plus className="h-3 w-3" /> Add option
              </button>
            )}
          </div>

          {/* remaining fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Class</label>
              <Select value={draft.classId} onValueChange={v => onChange(index, { classId: v })}>
                <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select class" /></SelectTrigger>
                <SelectContent>{classes.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Book</label>
              <Select value={draft.bookId} onValueChange={v => onChange(index, { bookId: v })}>
                <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select book" /></SelectTrigger>
                <SelectContent>{books.map(b => <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Chapter</label>
              <Select value={draft.chapterId} onValueChange={v => onChange(index, { chapterId: v })}>
                <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select chapter" /></SelectTrigger>
                <SelectContent>{chapters.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Heading</label>
              <Select value={draft.headingId} onValueChange={v => onChange(index, { headingId: v })}>
                <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select heading" /></SelectTrigger>
                <SelectContent>{headings.map(h => <SelectItem key={h.value} value={h.value}>{h.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Sub Heading</label>
              <Select value={draft.subHeadingId} onValueChange={v => onChange(index, { subHeadingId: v })}>
                <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select sub heading" /></SelectTrigger>
                <SelectContent>{subHeadings.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Difficulty</label>
              <Select value={draft.difficulty} onValueChange={v => onChange(index, { difficulty: v as DraftQuestion['difficulty'] })}>
                <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={DifficultyEnum.EASY}>Easy</SelectItem>
                  <SelectItem value={DifficultyEnum.MEDIUM}>Medium</SelectItem>
                  <SelectItem value={DifficultyEnum.HARD}>Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Status</label>
              <Select value={draft.status} onValueChange={v => onChange(index, { status: v as 'active' | 'inactive' })}>
                <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={StatusEnum.Active}>Active</SelectItem>
                  <SelectItem value={StatusEnum.Inactive}>Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Explanation (optional)</label>
            <Textarea
              value={draft.explanation}
              onChange={e => onChange(index, { explanation: e.target.value })}
              rows={2}
              placeholder="Explain the correct answer..."
              className="text-sm"
            />
          </div>

          {draft.error && (
            <Para className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 rounded px-3 py-2">{draft.error}</Para>
          )}

          <div className="flex justify-end">
            <Button
              type="button"
              size="sm"
              onClick={() => onSubmitOne(index)}
              disabled={draft.submitting}
            >
              {draft.submitting ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" /> : null}
              Submit this question
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface ImportedQuestion {
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'active' | 'inactive';
}

interface McqBulkImportProps {
  /**
   * When provided, the parsed questions are handed directly to the caller
   * instead of going through the standalone review/submit drawer. Used inside
   * the Add MCQs stepper where class/book/chapter/heading/subHeading are
   * already selected in step 1.
   */
  onImport?: (questions: ImportedQuestion[]) => void;
  defaultStatus?: 'active' | 'inactive';
}

export function McqBulkImport({ onImport, defaultStatus = 'active' }: McqBulkImportProps = {}) {
  const [step, setStep] = useState<'guide' | 'drawer'>('guide');
  const [isOpen, setIsOpen] = useState(false);
  const [parseError, setParseError] = useState('');
  const [pastedText, setPastedText] = useState('');
  const [drafts, setDrafts] = useState<DraftQuestion[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const createMcqsMutation = useCreateMcqs();
  const dropdowns = useDropdowns();

  const resetAndClose = () => {
    setIsOpen(false);
    setStep('guide');
    setParseError('');
    setPastedText('');
    setDrafts([]);
  };

  const processCsvText = (text: string) => {
    try {
      setParseError('');
      const questions = parseCsv(text);
      if (questions.length === 0) {
        setParseError('No valid rows found. Make sure name and at least 2 options are filled.');
        return;
      }

      if (onImport) {
        onImport(
          questions.map(q => ({
            ...q,
            explanation: '',
            difficulty: 'medium',
            status: defaultStatus,
          }))
        );
        resetAndClose();
        return;
      }

      const newDrafts: DraftQuestion[] = questions.map((q, i) => ({
        ...q,
        classId: '', bookId: '', chapterId: '', headingId: '', subHeadingId: '',
        difficulty: 'medium', explanation: '', status: 'active',
        submitted: false, submitting: false, error: '',
        expanded: i === 0,
      }));
      setDrafts(newDrafts);
      setStep('drawer');
    } catch (err) {
      setParseError((err as Error).message);
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      const text = evt.target?.result as string;
      processCsvText(text);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const patchDraft = (index: number, patch: Partial<DraftQuestion>) => {
    setDrafts(prev => prev.map((d, i) => i === index ? { ...d, ...patch } : d));
  };

  const buildPayload = (d: DraftQuestion) => ({
    classId: d.classId,
    bookId: d.bookId,
    chapterId: d.chapterId,
    headingId: d.headingId,
    subHeadingId: d.subHeadingId,
    status: d.status,
    questions: [{
      question: d.question,
      options: d.options,
      correctOption: d.correctOption,
      explanation: d.explanation,
      difficulty: d.difficulty,
      status: d.status,
    }],
  });

  const submitOne = async (index: number) => {
    patchDraft(index, { submitting: true, error: '' });
    try {
      await new Promise<void>((resolve, reject) => {
        createMcqsMutation.mutate(buildPayload(drafts[index]), {
          onSuccess: () => resolve(),
          onError: (err) => reject(err),
        });
      });
      patchDraft(index, { submitted: true, submitting: false, expanded: false });
      toast.success(`Question ${index + 1} saved`);
    } catch (err: unknown) {
      patchDraft(index, { submitting: false, error: (err as Error).message || 'Failed to save' });
    }
  };

  const submitAll = async () => {
    const pending = drafts.map((_, i) => i).filter(i => !drafts[i].submitted);
    for (const i of pending) {
      await submitOne(i);
    }
    const allDone = drafts.filter((_, i) => !drafts[i].submitted).length === 0;
    if (allDone) toast.success('All questions saved!');
  };

  const submittedCount = drafts.filter(d => d.submitted).length;
  const pendingCount = drafts.length - submittedCount;
  const anySubmitting = drafts.some(d => d.submitting);

  // ── render ────────────────────────────────────────────────────────────────

  if (step === 'drawer') {
    return (
      <>
        {/* Drawer overlay */}
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={!anySubmitting ? resetAndClose : undefined} />
          <div className="relative flex h-full w-full max-w-2xl flex-col bg-background shadow-xl">
            {/* drawer header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4 shrink-0">
              <div>
                <Heading2 className="text-base font-semibold text-foreground">Review & Submit MCQs</Heading2>
                <Para className="text-xs text-muted-foreground mt-0.5">
                  {submittedCount}/{drafts.length} saved · {pendingCount} pending
                </Para>
              </div>
              <button
                onClick={resetAndClose}
                disabled={anySubmitting}
                className="rounded-md p-1 text-muted-foreground hover:bg-muted transition-colors disabled:opacity-40"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* question list */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {drafts.map((draft, i) => (
                <QuestionCard
                  key={i}
                  index={i}
                  draft={draft}
                  onChange={patchDraft}
                  onSubmitOne={submitOne}
                  dropdowns={dropdowns}
                />
              ))}
            </div>

            {/* drawer footer */}
            {pendingCount > 0 && (
              <div className="border-t border-border px-5 py-4 flex items-center justify-between shrink-0 bg-background">
                <Para className="text-sm text-muted-foreground">{pendingCount} question(s) not yet saved</Para>
                <Button onClick={submitAll} disabled={anySubmitting}>
                  {anySubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Submit All ({pendingCount})
                </Button>
              </div>
            )}
            {pendingCount === 0 && drafts.length > 0 && (
              <div className="border-t border-border px-5 py-4 flex justify-end shrink-0 bg-background">
                <Button onClick={resetAndClose}>
                  <CheckCircle2 className="h-4 w-4 mr-2" /> Done
                </Button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // ── Step 1: guide modal ───────────────────────────────────────────────────
  return (
    <>
      <Button type="button" variant="outline" onClick={() => setIsOpen(true)}>
        <Upload className="h-4 w-4 mr-2" />
        Bulk Import
      </Button>

      <Dialog open={isOpen} onOpenChange={open => { if (!open) { setIsOpen(false); setParseError(''); } else setIsOpen(true); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Bulk Import MCQs via CSV</DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            {/* column guide */}
            <div>
              <Para className="text-sm font-medium text-foreground mb-2">CSV Column Guide</Para>
              <div className="rounded-lg border border-border overflow-hidden text-sm">
                <table className="w-full">
                  <thead className="bg-muted/60">
                    <tr>
                      <th className="text-left px-3 py-2 font-medium text-foreground w-40">Column</th>
                      <th className="text-left px-3 py-2 font-medium text-foreground">Description</th>
                      <th className="text-left px-3 py-2 font-medium text-foreground w-24">Required</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { col: 'name', desc: 'The question text', req: true },
                      { col: 'correct_option', desc: 'Number of the correct option (1, 2, 3 …) or letter (A, B, C …)', req: true },
                      { col: 'option1', desc: 'First option', req: true },
                      { col: 'option2', desc: 'Second option', req: true },
                      { col: 'option3', desc: 'Third option', req: false },
                      { col: 'option4', desc: 'Fourth option', req: false },
                      { col: 'option5', desc: 'Fifth option', req: false },
                      { col: 'option6', desc: 'Sixth option (maximum)', req: false },
                    ].map(row => (
                      <tr key={row.col} className="odd:bg-background even:bg-muted/20">
                        <td className="px-3 py-2 font-mono text-primary">{row.col}</td>
                        <td className="px-3 py-2 text-muted-foreground">{row.desc}</td>
                        <td className="px-3 py-2">
                          {row.req
                            ? <span className="inline-flex items-center rounded-full bg-red-100 dark:bg-red-900/30 px-2 py-0.5 text-xs font-medium text-red-700 dark:text-red-300">Required</span>
                            : <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">Optional</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Para className="text-xs text-muted-foreground mt-2">
                Leave <span className="font-mono">option5</span> / <span className="font-mono">option6</span> empty for questions with fewer options. Blank trailing options are ignored.
              </Para>
            </div>

            {/* example snippet */}
            <div>
              <Para className="text-sm font-medium text-foreground mb-1">Example</Para>
              <pre className="rounded-md bg-muted px-4 py-3 text-xs text-muted-foreground overflow-x-auto">
{`name,correct_option,option1,option2,option3,option4
What is 2+2?,2,3,4,5,6
Capital of Pakistan?,1,Islamabad,Lahore,Karachi,`}
              </pre>
            </div>

            {/* paste CSV data */}
            <div>
              <Para className="text-sm font-medium text-foreground mb-1">Or Paste CSV Data</Para>
              <Textarea
                value={pastedText}
                onChange={e => setPastedText(e.target.value)}
                onPaste={e => {
                  const text = e.clipboardData.getData('text');
                  if (text) {
                    setPastedText(text);
                    processCsvText(text);
                  }
                }}
                rows={4}
                placeholder="Paste CSV data here (Ctrl+V)..."
                className="text-xs font-mono"
              />
              {pastedText.trim() && (
                <div className="flex justify-end mt-2">
                  <Button type="button" size="sm" onClick={() => processCsvText(pastedText)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Process Pasted Data
                  </Button>
                </div>
              )}
            </div>

            {parseError && (
              <div className="rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                {parseError}
              </div>
            )}

            {/* actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border">
              <Button type="button" variant="outline" onClick={downloadTemplate}>
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
              <Button type="button" onClick={() => fileRef.current?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Upload CSV File
              </Button>
              <input ref={fileRef} type="file" accept=".csv,text/csv" onChange={handleFile} className="hidden" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
