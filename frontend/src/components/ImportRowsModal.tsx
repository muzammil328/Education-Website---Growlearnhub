'use client';

import React, { useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Para,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableRoot,
  toast,
} from '@muzammil328/ui';
import { Download, Upload } from 'lucide-react';

export interface ImportedRow {
  name: string;
  order: string;
}

interface ImportRowsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (rows: ImportedRow[]) => void;
  title?: string;
}

const SAMPLE_ROWS: ImportedRow[] = [
  { name: 'Introduction', order: '1' },
  { name: 'Basics', order: '2' },
];

const parseCSV = (text: string): ImportedRow[] => {
  const lines = text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);

  const dataLines =
    lines.length > 0 && lines[0].toLowerCase().startsWith('name') ? lines.slice(1) : lines;

  return dataLines
    .map(line => {
      const [name = '', order = ''] = line.split(',').map(cell => cell.trim());
      return { name, order };
    })
    .filter(row => row.name.length > 0);
};

export function ImportRowsModal({
  isOpen,
  onOpenChange,
  onImport,
  title = 'Import',
}: ImportRowsModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
    onOpenChange(open);
  };

  const handleDownloadSample = () => {
    const csv = ['Name,Order', ...SAMPLE_ROWS.map(row => `${row.name},${row.order}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sample.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!selectedFile) {
      toast.error('Please choose a CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || '');
      const rows = parseCSV(text);

      if (rows.length === 0) {
        toast.error('No valid rows found in the file');
        return;
      }

      onImport(rows);
      handleOpenChange(false);
    };
    reader.onerror = () => toast.error('Failed to read the file');
    reader.readAsText(selectedFile);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-6 shadow-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Para className="text-sm text-muted-foreground mb-2">
              File should have two columns: Name and Order.
            </Para>
            <TableRoot className="border rounded-md">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Order</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SAMPLE_ROWS.map(row => (
                  <TableRow key={row.name}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.order}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableRoot>
          </div>

          <Button type="button" variant="outline" size="sm" onClick={handleDownloadSample}>
            <Download className="h-4 w-4 mr-1" /> Download Sample
          </Button>

          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={e => setSelectedFile(e.target.files?.[0] || null)}
              className="block w-full text-sm border rounded-md p-2"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleImport}>
              <Upload className="h-4 w-4 mr-1" /> Import
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
