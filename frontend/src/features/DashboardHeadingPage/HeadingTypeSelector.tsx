'use client';

import { Card, CardContent, CardTitle, Para } from '@muzammil328/ui';
import { GraduationCap, BookOpen } from 'lucide-react';

export type HeadingType = 'class' | 'subject';

interface HeadingTypeSelectorProps {
  onSelect: (type: HeadingType) => void;
}

export default function HeadingTypeSelector({ onSelect }: HeadingTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4 py-2">
      <Card
        className="cursor-pointer hover:border-primary transition-colors"
        onClick={() => onSelect('class')}
      >
        <CardContent className="flex flex-col items-center justify-center gap-3 py-8 text-center">
          <GraduationCap className="h-10 w-10 text-primary" />
          <CardTitle>Class Based</CardTitle>
          <Para className="text-sm text-muted-foreground">
            Organize under Class → Book → Chapter
          </Para>
        </CardContent>
      </Card>
      <Card
        className="cursor-pointer hover:border-primary transition-colors"
        onClick={() => onSelect('subject')}
      >
        <CardContent className="flex flex-col items-center justify-center gap-3 py-8 text-center">
          <BookOpen className="h-10 w-10 text-primary" />
          <CardTitle>Subject Based</CardTitle>
          <Para className="text-sm text-muted-foreground">
            Organize directly under a Subject
          </Para>
        </CardContent>
      </Card>
    </div>
  );
}
