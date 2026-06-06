import React, { ChangeEvent, useEffect, useState } from 'react';
import { Label, Input } from '@muzammil328/ui';

interface MidPercentageProps {
  calculatedMid: number;
  setCalculatedMid: (value: number) => void;
  totalMidMark: number;
  MidPercentage: number;
  setTotalMidMark: (value: number) => void;
  setMidPercentage: (value: number) => void;
}

export default function MidPercentage({
  calculatedMid,
  setCalculatedMid,
  totalMidMark,
  MidPercentage,
  setTotalMidMark,
  setMidPercentage,
}: MidPercentageProps) {
  const [obtainedMidMark, setObtainedMidMark] = useState<number>(0);

  const calculateMidPercentage = (
    obtainedMidMark: number,
    totalMidMark: number,
    MidPercentage: number
  ): number => {
    if (totalMidMark === 0) {
      return 0; // Default value or handle appropriately
    }

    return (obtainedMidMark / totalMidMark) * ((MidPercentage / 100) * 100);
  };
  useEffect(() => {
    const data1 = calculateMidPercentage(obtainedMidMark, totalMidMark, MidPercentage);
    if (data1) {
      setCalculatedMid(data1);
    }
  }, [obtainedMidMark, MidPercentage, totalMidMark, setCalculatedMid]);

  const handleDecimalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseFloat(value); // Convert string to number using parseFloat

    setObtainedMidMark(parsedValue);
  };

  return (
    <div>
      <span className="mr-2 text-gray-400">Mid Percentage:</span>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        <div className="my-4">
          <Label htmlFor="MidPercentage" />
          <Input
            name="MidPercentage"
            type="number"
            value={MidPercentage || ''}
            placeholder="Mid Percentage"
            onChange={e => setMidPercentage(parseFloat(e.target.value))}
          />
        </div>
        <div className="my-4">
          <Label htmlFor="totalMidMark" />
          <Input
            name="totalMidMark"
            type="number"
            value={totalMidMark || ''}
            placeholder="Total Mid Marks"
            onChange={e => setTotalMidMark(parseInt(e.target.value))}
          />
        </div>
        <div className="my-4">
          <Label htmlFor="obtainedMidMark" />
          <Input
            name="obtainedMidMark"
            type="number"
            value={obtainedMidMark || ''}
            placeholder="Obtained Mid Marks"
            onChange={handleDecimalChange}
          />
        </div>
        <span className="flex items-center justify-center">{calculatedMid}</span>
      </div>
    </div>
  );
}
