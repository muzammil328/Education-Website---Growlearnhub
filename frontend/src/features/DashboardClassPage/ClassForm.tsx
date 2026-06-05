'use client';

import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@muzammil328/ui';

import { Form } from '@muzammil328/ui';

import { FormProps } from '@muzammil328/education-packages/types';
import { useClassById, useCreateClass, useUpdateClass } from '@/hooks';
import { ClassSchema, type ClassFormValues } from '@muzammil328/education-packages';
import ClassModalSkeleton from './ClassModalSkeleton';
import ClassModalView from './ClassModalView';
import ClassModalForm from './ClassModalForm';
import { ModalFormActionButton } from '@/components/ModalFormActionButton';

interface DashboardClassFormProps extends FormProps {
  classId?: string;
}

export function ClassForm({
  isOpen,
  setIsOpen,
  classId,
  onClose,
  mode = 'add',
}: DashboardClassFormProps) {
  const isEdit = mode === 'edit';
  const isView = mode === 'view';

  const createClassMutation = useCreateClass();
  const updateClassMutation = useUpdateClass();

  const { data: classData, isLoading: isLoadingClass } = useClassById(
    (isEdit || isView) && isOpen ? classId : undefined
  );

  const form = useForm<ClassFormValues>({
    resolver: zodResolver(ClassSchema),
    defaultValues: {
      name: '',
      description: '',
      serviceId: [],
      image: '',
      keywords: [],
      status: 'active',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if ((isEdit || isView) && isOpen && classData) {
      form.reset({
        name: classData.name || '',
        description: classData.description || '',
        serviceId: Array.isArray(classData.serviceId) ? classData.serviceId : [],
        image: classData.image || '',
        keywords: Array.isArray(classData.keywords) ? classData.keywords : [],
        status: (classData.status as 'active' | 'inactive') || 'active',
      });
    }
    if (mode === 'add' && isOpen) {
      form.reset({
        name: '',
        description: '',
        serviceId: [],
        image: '',
        keywords: [],
        status: 'active',
      });
    }
  }, [classData, form, isEdit, isOpen, isView, mode]);

  const onSubmit = (values: ClassFormValues) => {
    if (isEdit && classId) {
      updateClassMutation.mutate(
        {
          id: classId,
          updates: values,
        },
        {
          onSuccess: response => {
            toast.success(response.message || 'Class updated successfully');
            if (setIsOpen) setIsOpen(false);
          },
          onError: error => {
            toast.error(error.message || 'Failed to update class');
          },
        }
      );
      return;
    }

    createClassMutation.mutate(values, {
      onSuccess: response => {
        toast.success(response.message || 'Class created successfully');
        form.reset();
        if (setIsOpen) setIsOpen(false);
      },
      onError: error => {
        toast.error(error.message || 'Failed to create class');
      },
    });
  };

  const isLoading = createClassMutation.isPending || updateClassMutation.isPending;
  const formValues = form.getValues();
  const submitLabel = isEdit ? 'Update Class' : isView ? '' : 'Add Class';

  if (isLoadingClass && !classData && isEdit) {
    return <ClassModalSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, errors => console.error('Form validation errors:', errors))} className="space-y-4">
        {isView ? <ClassModalView formValues={formValues} /> : <ClassModalForm isOpen={isOpen} />}
        <ModalFormActionButton
          onClose={onClose}
          label={submitLabel}
          view={isView}
          loading={isLoading}
        />
      </form>
    </Form>
  );
}
