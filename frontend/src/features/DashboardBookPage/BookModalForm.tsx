'use client';

import { useMemo, useState } from 'react';
import { SelectField } from '@/components/ui/select-field'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@muzammil328/ui'
import { Label, FormString, FormNumber } from '@muzammil328/ui';
import { Button } from '@muzammil328/ui';
import { DropdownLoader } from '@muzammil328/ui';

import { useFormContext, useFieldArray } from 'react-hook-form';
import { useDropdownClasses } from '@/hooks';
import { DropdownSkeleton } from '@/components/DropdownSkeleton';
import { Plus } from 'lucide-react';
import type { BookFormValues } from '@muzammil328/education-packages';

function AssessmentComponentsForm() {
  const { control } = useFormContext<BookFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'components' as const,
  });
  const [isAddComponentOpen, setIsAddComponentOpen] = useState(false);
  const [newComponent, setNewComponent] = useState({ title: '', weight: 0, description: '' });

  const handleAddComponent = () => {
    append(newComponent);
    setNewComponent({ title: '', weight: 0, description: '' });
    setIsAddComponentOpen(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Assessment Components</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsAddComponentOpen(true)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Component
        </Button>
      </div>

      {fields.length === 0 ? (
        <p className="text-sm text-muted-foreground py-2">No components added yet.</p>
      ) : (
        fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-2 rounded border p-2">
            <div className="flex-1 space-y-2">
              <p className="font-medium">{field.title || `Component ${index + 1}`}</p>
              <p className="text-sm text-muted-foreground">Weight: {field.weight}%</p>
            </div>
            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </div>
        ))
      )}

      <Dialog open={isAddComponentOpen} onOpenChange={setIsAddComponentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Assessment Component</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter component title"
                value={newComponent.title}
                onChange={e => setNewComponent({ ...newComponent, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Weight (%)</Label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter weight (0-100)"
                value={newComponent.weight || ''}
                onChange={e =>
                  setNewComponent({ ...newComponent, weight: parseInt(e.target.value) || 0 })
                }
              />
            </div>
            <div>
              <Label>Description</Label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter description (optional)"
                value={newComponent.description}
                onChange={e => setNewComponent({ ...newComponent, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddComponentOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddComponent} disabled={!newComponent.title}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function BookModalForm({ isOpen = true }: { isOpen?: boolean }) {
  const {
    data: classData,
    isLoading: isLoadingClasses,
    error: classesError,
  } = useDropdownClasses(isOpen);

  const classOptions = useMemo(() => {
    if (!classData) return [];
    return classData.map((item: { value?: string; label?: string }) => ({
      value: item.value || '',
      label: item.label || 'Unnamed Class',
    }));
  }, [classData]);

  return (
    <div className="space-y-4">
      <FormString name="name" label="Name" placeholder="Enter Book Name" />

      <FormString name="code" label="Code" placeholder="Enter Book Code (e.g., MTH101)" />

      <div className="space-y-2">
        {isLoadingClasses ? (
          <DropdownSkeleton />
        ) : (
          <div>
            <Label>Class</Label>
            <DropdownLoader
              isLoading={isLoadingClasses}
              error={classesError}
              isEmpty={classOptions.length === 0}
              emptyMessage="No active classes found."
            >
              <SelectField name="classId" placeholder="Select a class" options={classOptions} />
            </DropdownLoader>
          </div>
        )}
      </div>

      <FormString
        name="description"
        label="Description"
        placeholder="Enter book description (optional)"
      />

      <div className="grid grid-cols-2 gap-4">
        <FormNumber name="creditHours" label="Credit Hours" placeholder="Enter credit hours" />
        <FormNumber name="pages" label="Pages" placeholder="Enter number of pages" />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <FormNumber
          name="totalWeight"
          label="Total Weight"
          placeholder="Enter total weight (default 100)"
        />
      </div>

      <FormString name="image" label="Image URL" placeholder="Enter image URL (optional)" />
      <FormString name="fileId" label="File ID" placeholder="Enter file ID (optional)" />

      <AssessmentComponentsForm />

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
