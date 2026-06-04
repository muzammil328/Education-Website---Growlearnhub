import React, { ChangeEvent, useEffect, useState } from 'react';
import { Input, Label } from '@muzammil328/ui/forms';

interface AssignmentPercentageProps {
  calculatedAssignment: number;
  setCalculatedAssignment: (value: number) => void;
}

export default function AssignmentPercentage({
  calculatedAssignment,
  setCalculatedAssignment,
}: AssignmentPercentageProps) {
  const [totalAssignment, setTotalAssignment] = useState<number>(0);
  const [obtainedAssignment, setObtainedAssignment] = useState<number>(0);
  const [assignmentPercentage, setAssignmentPercentage] = useState<number>(0);

  const calculateAssignmentPercentage = (
    obtainedAssignment: number,
    totalAssignment: number,
    assignmentPercentage: number
  ): number => {
    if (totalAssignment === 0) {
      return 0;
    }

    return (obtainedAssignment / totalAssignment) * ((assignmentPercentage / 100) * 100);
  };
  useEffect(() => {
    const data1 = calculateAssignmentPercentage(
      obtainedAssignment,
      totalAssignment,
      assignmentPercentage
    );
    if (data1) {
      setCalculatedAssignment(data1);
    }
  }, [obtainedAssignment, assignmentPercentage, totalAssignment, setCalculatedAssignment]);

  const handleDecimalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseFloat(value); // Convert string to number using parseFloat

    setObtainedAssignment(parsedValue);
  };
  return (
    <div>
      <span className="mr-2 text-gray-400">Assignment Percentage:</span>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        <div className="my-4">
          <Label htmlFor="quizPercentage" />
          <Input
            name="assignmentPercentage"
            type="number"
            value={assignmentPercentage || ''}
            placeholder="Assignment Percentage"
            onChange={e => setAssignmentPercentage(parseInt(e.target.value))}
          />
        </div>
        <div className="my-4">
          <Label htmlFor="totalAssignment" />
          <Input
            name="totalAssignment"
            type="number"
            value={totalAssignment || ''}
            placeholder="Total Assignment Marks"
            onChange={e => setTotalAssignment(parseInt(e.target.value))}
          />
        </div>
        <div className="my-4">
          <Label htmlFor="tmidterm" />
          <Input
            name="obtainedAssignment"
            type="number"
            value={obtainedAssignment || ''}
            placeholder="Obtained Assignment Marks"
            onChange={handleDecimalChange}
          />
        </div>
        <span className="flex items-center justify-center">{calculatedAssignment}</span>
      </div>
    </div>
  );
}
