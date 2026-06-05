'use client';

import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { SelectField } from '@/components/ui/'
import { FormString, Label, Textarea, MultiFormSelect } from '@muzammil328/ui';
import { useDropdownClasses } from '@/hooks/use-class';

export default function ServiceModalForm({ isOpen = true }: { isOpen?: boolean }) {
  const { data: classData, isLoading: classLoading } = useDropdownClasses(isOpen);
  const { register } = useFormContext();

  const classOptions = useMemo(() => {
    if (!classData) return [];
    return classData.map(item => ({
      value: item.value || '',
      label: item.label || 'Unnamed Class',
    }));
  }, [classData]);

  return (
    <React.Fragment>
      <FormString name="name" label="Name" placeholder="Enter Service Name" />

      <MultiFormSelect
        name="classId"
        label="Classes"
        placeholder="Select classes"
        options={classOptions}
        disabled={classLoading}
      />

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter service description (optional)"
          {...register('description')}
        />
      </div>

      <FormString
        name="image"
        label="Image URL"
        placeholder="https://example.com/service-image.jpg"
      />

      <SelectField
        name="status"
        label="Status"
        placeholder="Select Status"
        options={[
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ]}
      />
    </React.Fragment>
  );
}
