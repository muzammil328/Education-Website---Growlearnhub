'use client';

import React, { useMemo } from 'react';
import { SelectField } from '@/components/ui/select-field'
import { Label, FormString } from '@muzammil328/ui/forms';
import { useDropdownClasses } from '@/hooks';
import { DropdownLoader } from '@muzammil328/ui';
import { DropdownSkeleton } from '@/components/DropdownSkeleton';

export default function BoardModalForm({ isOpen = true }: { isOpen?: boolean }) {
  const {
    data: classData,
    isLoading: isLoadingClasses,
    error: classesError,
  } = useDropdownClasses(isOpen);

  const classOptions = useMemo(() => {
    if (!classData) return [];
    return classData.map(item => ({
      value: item.value || '',
      label: item.label || 'Unnamed Class',
    }));
  }, [classData]);

  return (
    <React.Fragment>
      <FormString name="name" label="Name" placeholder="Enter Board Name" />

      <div className="space-y-2">
        {isLoadingClasses ? (
          <DropdownSkeleton />
        ) : (
          <React.Fragment>
            <Label>Class</Label>
            <DropdownLoader
              isLoading={isLoadingClasses}
              error={classesError}
              isEmpty={classOptions.length === 0}
              emptyMessage="No active classes found."
            >
              <SelectField
                name="classId"
                label="Class"
                placeholder="Select Class"
                options={classOptions}
              />
            </DropdownLoader>
          </React.Fragment>
        )}
      </div>

      <FormString
        name="description"
        label="Description"
        placeholder="Enter board description (optional)"
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
