'use client';

import { useState, useRef } from 'react';
import { Button } from '@muzammil328/ui';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@muzammil328/ui';
import { Textarea } from '@muzammil328/ui/forms';
import { Upload, FileJson, Download } from 'lucide-react';
import { mcqQuestionSchema } from '@muzammil328/education-packages';
import { toast } from '@muzammil328/ui';

interface Question {
  question: string;
  options: string[];
  correctOption: number;
  explanation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  status?: 'active' | 'inactive';
}

interface McqBulkImportProps {
  onImport: (questions: Question[]) => void;
}

export function McqBulkImport({ onImport }: McqBulkImportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const templateJson = [
    {
      question: 'What is 2+2?',
      options: ['3', '4', '5', '6'],
      correctOption: 1,
      explanation: '2+2 equals 4',
      difficulty: 'easy',
      status: 'active',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const text = event.target?.result as string;
      setJsonText(text);
      validateAndImport(text);
    };
    reader.readAsText(file);
  };

  const handleTextSubmit = () => {
    validateAndImport(jsonText);
  };

  const validateAndImport = (text: string) => {
    setError('');

    try {
      const parsed = JSON.parse(text);

      if (!Array.isArray(parsed)) {
        setError('JSON must be an array of questions');
        return;
      }

      const validQuestions: Question[] = [];
      const errors: string[] = [];

      parsed.forEach((item, index) => {
        try {
          const validated = mcqQuestionSchema.parse({
            ...item,
            status: item.status || 'active',
            difficulty: item.difficulty || 'medium',
          });
          validQuestions.push(validated);
        } catch (err: unknown) {
          const error = err as { errors?: { message: string }[] };
          errors.push(`Question ${index + 1}: ${error.errors?.[0]?.message || 'Invalid format'}`);
        }
      });

      if (errors.length > 0) {
        setError(errors.join('\n'));
        return;
      }

      onImport(validQuestions);
      toast.success(`Imported ${validQuestions.length} question(s) successfully`);
      setIsOpen(false);
      setJsonText('');
    } catch (err) {
      setError('Invalid JSON format: ' + (err as Error).message);
    }
  };

  const downloadTemplate = () => {
    const blob = new Blob([JSON.stringify(templateJson, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mcq-template.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Button type="button" variant="outline" onClick={() => setIsOpen(true)}>
        <Upload className="h-4 w-4 mr-2" />
        Bulk Import
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Bulk Import MCQs</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                <FileJson className="h-4 w-4 mr-2" />
                Upload JSON File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button type="button" variant="outline" onClick={downloadTemplate}>
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Or Paste JSON Here</span>
              <Textarea
                value={jsonText}
                onChange={e => setJsonText(e.target.value)}
                placeholder={JSON.stringify(templateJson, null, 2).slice(0, 200) + '...'}
                className="min-h-50 font-mono text-sm"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm whitespace-pre-wrap">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleTextSubmit} disabled={!jsonText.trim()}>
                Import Questions
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
