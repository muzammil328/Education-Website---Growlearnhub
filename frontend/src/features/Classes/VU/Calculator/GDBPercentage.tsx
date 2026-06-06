import React, { ChangeEvent, useEffect, useState } from 'react';
import { Label, Input } from '@muzammil328/ui';

interface GDBPercentageProps {
  calculatedGDB: number;
  setCalculatedGDB: (value: number) => void;
}

export default function GDBPercentage({ calculatedGDB, setCalculatedGDB }: GDBPercentageProps) {
  const [totalGDB, setTotalDGB] = useState<number>(0);
  const [obtainedGDB, setObtainedDGB] = useState<number>(0);
  const [GDBPercentage, setDGBPercentage] = useState<number>(0);

  const calculateGDBPercentage = (
    obtainedGDB: number,
    totalGDB: number,
    GDBPercentage: number
  ): number => {
    if (totalGDB === 0) {
      return 0; // Default value or handle appropriately
    }

    return (obtainedGDB / totalGDB) * ((GDBPercentage / 100) * 100);
  };
  useEffect(() => {
    const data1 = calculateGDBPercentage(obtainedGDB, totalGDB, GDBPercentage);
    if (data1) {
      setCalculatedGDB(data1);
    }
  }, [obtainedGDB, GDBPercentage, totalGDB, setCalculatedGDB]);

  const handleDecimalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseFloat(value); // Convert string to number using parseFloat

    setObtainedDGB(parsedValue);
  };

  return (
    <div>
      <span className="mr-2 text-gray-400">GDB Percentage:</span>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        <div className="my-4">
          <Label htmlFor="GDBPercentage" />
          <Input
            name="GDBPercentage"
            type="number"
            value={GDBPercentage || ''}
            placeholder="GDB Percentage"
            onChange={e => setDGBPercentage(parseInt(e.target.value))}
          />
        </div>
        <div className="my-4">
          <Label htmlFor="totalGDB" />
          <Input
            name="totalGDB"
            type="number"
            value={totalGDB || ''}
            placeholder="Total GDB Marks"
            onChange={e => setTotalDGB(parseInt(e.target.value))}
          />
        </div>
        <div className="my-4">
          <Label htmlFor="obtainedGDB" />
          <Input
            name="obtainedGDB"
            type="number"
            value={obtainedGDB || ''}
            placeholder="Obtained GDB Marks"
            onChange={handleDecimalChange}
          />
        </div>
        <span className="flex items-center justify-center">{calculatedGDB}</span>
      </div>
    </div>
  );
}
