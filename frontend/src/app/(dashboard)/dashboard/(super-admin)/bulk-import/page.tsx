'use client';

import { useState, useRef } from 'react';
import { trpc } from '@/trpc/trpc';
import { cn } from '@/lib/utils';
import { Upload, CheckCircle, XCircle, AlertTriangle, Download } from 'lucide-react';
import { Heading1, Heading2, Para } from '@muzammil328/ui';

type ParsedRow = {
  question: string;
  options: string[];
  correctOption: number;
  explanation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
};

type ImportError = { row: number; message: string };

/** Parse a CSV where columns are: question, optionA, optionB, optionC, optionD, correctOption(0-indexed), explanation, difficulty */
function parseCsv(text: string): { rows: ParsedRow[]; parseErrors: string[] } {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  if (!lines.length) return { rows: [], parseErrors: ['File is empty'] };
  // Skip header if first cell looks like "question"
  const start = lines[0].toLowerCase().startsWith('question') ? 1 : 0;
  const rows: ParsedRow[] = [];
  const parseErrors: string[] = [];

  for (let i = start; i < lines.length; i++) {
    const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
    if (cols.length < 6) { parseErrors.push(`Row ${i + 1}: too few columns (need ≥ 6)`); continue; }
    const [question, a, b, c, d, correctRaw, explanation, difficulty] = cols;
    const options = [a, b, c, d].filter(Boolean);
    const correctOption = parseInt(correctRaw ?? '0', 10);
    if (isNaN(correctOption)) { parseErrors.push(`Row ${i + 1}: correctOption must be a number`); continue; }
    rows.push({
      question,
      options,
      correctOption,
      explanation: explanation || undefined,
      difficulty: (['easy', 'medium', 'hard'].includes(difficulty) ? difficulty : 'medium') as 'easy' | 'medium' | 'hard',
    });
  }
  return { rows, parseErrors };
}

export default function BulkImportPage() {
  const [subHeadingId, setSubHeadingId] = useState('');
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const [dryRunResult, setDryRunResult] = useState<{ validCount: number; errorCount: number; errors: ImportError[] } | null>(null);
  const [importResult, setImportResult] = useState<{ inserted: number; errorCount: number; errors: ImportError[] } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const dryRunMutation = trpc.bulkImport.importMcqs.useMutation({
    onSuccess: data => setDryRunResult(data),
  });

  const importMutation = trpc.bulkImport.importMcqs.useMutation({
    onSuccess: data => setImportResult(data),
  });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const text = ev.target?.result as string;
      const { rows: parsed, parseErrors: errs } = parseCsv(text);
      setRows(parsed);
      setParseErrors(errs);
      setDryRunResult(null);
      setImportResult(null);
    };
    reader.readAsText(file);
  };

  const handleDryRun = () => {
    if (!subHeadingId || !rows.length) return;
    dryRunMutation.mutate({ subHeadingId, rows, dryRun: true });
  };

  const handleImport = () => {
    if (!subHeadingId || !rows.length) return;
    importMutation.mutate({ subHeadingId, rows, dryRun: false });
  };

  const downloadTemplate = () => {
    const csv = [
      'question,optionA,optionB,optionC,optionD,correctOption(0-based),explanation,difficulty',
      '"What is 2+2?","1","2","4","5",2,"Basic arithmetic","easy"',
      '"Capital of Pakistan?","Karachi","Lahore","Islamabad","Peshawar",2,"Islamabad is the capital","easy"',
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'mcq_template.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <Heading1 className="text-2xl font-bold">Bulk MCQ Import</Heading1>
          <Para className="text-sm text-muted-foreground mt-1">Upload a CSV file to import up to 500 MCQs at once</Para>
        </div>
        <button
          onClick={downloadTemplate}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-muted transition"
        >
          <Download className="w-4 h-4" />
          Download Template
        </button>
      </div>

      {/* Step 1 — SubHeading ID */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <Heading2 className="text-sm font-semibold text-foreground">Step 1 — Target SubHeading</Heading2>
        <input
          type="text"
          placeholder="SubHeading ID (MongoDB ObjectId)"
          value={subHeadingId}
          onChange={e => setSubHeadingId(e.target.value)}
          className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <Para className="text-xs text-muted-foreground">Find the SubHeading ID from the SubHeadings management page</Para>
      </div>

      {/* Step 2 — Upload */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <Heading2 className="text-sm font-semibold text-foreground">Step 2 — Upload CSV</Heading2>
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center gap-3 cursor-pointer hover:border-primary/50 hover:bg-muted/20 transition"
        >
          <Upload className="w-10 h-10 text-muted-foreground" />
          <Para className="text-sm text-muted-foreground">Click to upload CSV file</Para>
          <Para className="text-xs text-muted-foreground">Columns: question, A, B, C, D, correctOption, explanation, difficulty</Para>
        </div>
        <input ref={fileRef} type="file" accept=".csv,.txt" className="hidden" onChange={handleFile} />

        {parseErrors.length > 0 && (
          <div className="rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 p-3 space-y-1">
            <Para className="text-xs font-semibold text-red-700">Parse errors:</Para>
            {parseErrors.map((e, i) => <Para key={i} className="text-xs text-red-600">{e}</Para>)}
          </div>
        )}

        {rows.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-green-700">
            <CheckCircle className="w-4 h-4" />
            <span>{rows.length} rows parsed successfully</span>
          </div>
        )}
      </div>

      {/* Step 3 — Dry Run */}
      {rows.length > 0 && subHeadingId && (
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <Heading2 className="text-sm font-semibold text-foreground">Step 3 — Validate (Dry Run)</Heading2>
          <button
            onClick={handleDryRun}
            disabled={dryRunMutation.isPending}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-50 transition"
          >
            {dryRunMutation.isPending ? 'Validating...' : 'Run Validation'}
          </button>

          {dryRunResult && (
            <div className={cn('rounded-lg border p-4 space-y-2', dryRunResult.errorCount > 0 ? 'border-amber-200 bg-amber-50 dark:bg-amber-950/20' : 'border-green-200 bg-green-50 dark:bg-green-950/20')}>
              <div className="flex items-center gap-2">
                {dryRunResult.errorCount > 0
                  ? <AlertTriangle className="w-4 h-4 text-amber-600" />
                  : <CheckCircle className="w-4 h-4 text-green-600" />}
                <Para className="text-sm font-semibold">
                  {dryRunResult.validCount} valid, {dryRunResult.errorCount} errors
                </Para>
              </div>
              {dryRunResult.errors.map(e => (
                <Para key={e.row} className="text-xs text-amber-700 dark:text-amber-400">Row {e.row}: {e.message}</Para>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 4 — Import */}
      {dryRunResult && dryRunResult.validCount > 0 && !importResult && (
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <Heading2 className="text-sm font-semibold text-foreground">Step 4 — Import</Heading2>
          <Para className="text-xs text-muted-foreground">
            Will insert <strong>{dryRunResult.validCount}</strong> MCQs into the database.
            {dryRunResult.errorCount > 0 && ` ${dryRunResult.errorCount} invalid rows will be skipped.`}
          </Para>
          <button
            onClick={handleImport}
            disabled={importMutation.isPending}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-white hover:opacity-90 disabled:opacity-50 transition"
          >
            {importMutation.isPending ? 'Importing...' : `Import ${dryRunResult.validCount} MCQs`}
          </button>
        </div>
      )}

      {/* Result */}
      {importResult && (
        <div className={cn(
          'rounded-xl border p-5 space-y-2',
          importResult.errorCount > 0 ? 'border-amber-200 bg-amber-50 dark:bg-amber-950/20' : 'border-green-200 bg-green-50 dark:bg-green-950/20',
        )}>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <Para className="text-base font-semibold text-green-700">Import complete</Para>
          </div>
          <Para className="text-sm text-green-700">{importResult.inserted} MCQs inserted successfully</Para>
          {importResult.errorCount > 0 && (
            <Para className="text-sm text-amber-700">{importResult.errorCount} rows skipped due to errors</Para>
          )}
          <button
            onClick={() => { setRows([]); setDryRunResult(null); setImportResult(null); setSubHeadingId(''); if (fileRef.current) fileRef.current.value = ''; }}
            className="mt-2 px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition"
          >
            Import More
          </button>
        </div>
      )}
    </div>
  );
}
