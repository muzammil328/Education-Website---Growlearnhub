'use client';

import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@muzammil328/ui';

import { Form } from '@muzammil328/ui';

import { useClassById, useCreateClass, useUpdateClass } from '@/hooks';
import { classCreateSchema, type ClassCreateInput } from '@muzammil328/education-packages';
import ClassModalSkeleton from './ClassModalSkeleton';
import ClassModalView, { type ClassViewData } from './ClassModalView';
import ClassModalForm from './ClassModalForm';
import { ModalFormActionButton } from '@/components/ModalFormActionButton';

interface DashboardClassFormProps {
  isOpen: boolean;
  setIsOpen?: (open: boolean) => void;
  mode?: 'add' | 'edit' | 'view';
  onClose?: () => void;
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

  const form = useForm<ClassCreateInput>({
    resolver: zodResolver(classCreateSchema),
    defaultValues: {
      name: '',
      description: '',
      serviceIds: [],
      image: '',
      keywords: [],
      status: 'active',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if ((isEdit || isView) && isOpen && classData) {
      const item = classData.data;
      form.reset({
        name: item.name || '',
        description: item.description || '',
        serviceIds: Array.isArray(item.service) ? item.service.map(s => s.serviceId) : [],
        image: item.image || '',
        keywords: Array.isArray(item.keywords) ? item.keywords : [],
        status: (item.status as 'active' | 'inactive') || 'active',
      });
    }
    if (mode === 'add' && isOpen) {
      form.reset({
        name: '',
        description: '',
        serviceIds: [],
        image: '',
        keywords: [],
        status: 'active',
      });
    }
  }, [classData, form, isEdit, isOpen, isView, mode]);

  const onSubmit = (values: ClassCreateInput) => {
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
  const item = classData?.data;

  if (isLoadingClass && !classData && (isEdit || isView)) {
    return <ClassModalSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, errors => console.error('Form validation errors:', errors))} className="space-y-4">
        {isView ? <ClassModalView formValues={formValues} services={item?.service} /> : <ClassModalForm isOpen={isOpen} />}
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
