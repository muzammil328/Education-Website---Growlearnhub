import { ReactNode } from 'react';
import { Card, CardContent, Heading3, Para } from '@muzammil328/ui';

interface StatCardProps {
  title: string;
  count: number;
  icon: ReactNode;
}

const StatCard = ({ title, count, icon }: StatCardProps) => {
  return (
    <Card className="relative transition-all">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-destructive p-3">{icon}</div>
          <div>
            <Para className="text-sm font-medium text-muted-foreground">{title}</Para>
            <Heading3 className="text-2xl font-bold">{count}</Heading3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
