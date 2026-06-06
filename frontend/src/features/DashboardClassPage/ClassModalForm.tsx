'use client';

import React from 'react';
import { SelectField, TagField, TextareaField } from '@/components/ui/'
import { FormString, MultiFormSelect } from '@muzammil328/ui';
import { useDropdownServices } from '@/hooks';

export default function ClassModalForm({ isOpen = true }: { isOpen?: boolean }) {
  const {
    data: servicesResponse,
    isLoading: isLoadingServices,
  } = useDropdownServices(undefined, { enabled: isOpen });
  return (
    <div className="space-y-4">
      <FormString name="name" label="Name" placeholder="Enter Class Name" />

      <div className="space-y-2">
        <TextareaField
          name="description"
          label="Description"
          placeholder="Enter class description (optional)"
        />
      </div>

      <FormString
        name="image"
        label="Image URL"
        placeholder="https://example.com/class-image.jpg"
      />

      <MultiFormSelect
        name="serviceId"
        label="Services"
        placeholder="Select services"
        options={servicesResponse ?? []}
        className="w-full"
        disabled={isLoadingServices}
      />

      <TagField name="keywords" label="Keywords" placeholder="Type keyword and press Enter" />

      <SelectField
        name="status"
        label="Status"
        placeholder="Select Status"
        options={[
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ]}
      />
    </div>
  );
}
