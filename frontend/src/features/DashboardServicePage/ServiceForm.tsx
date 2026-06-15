'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, toast } from '@muzammil328/ui';
import { FormProps } from '@muzammil328/education-packages/types';
import { useServiceById, useCreateService, useUpdateService } from '@/hooks/use-service';
import { serviceCreateSchema, type ServiceCreateInput } from '@muzammil328/education-packages';
import { ServiceModalSkeleton } from './ServiceModalSkeleton';
import ServiceModalView from './ServiceModalView';
import ServiceModalForm from './ServiceModalForm';
import { ModalFormActionButton } from '@/components/ModalFormActionButton';

interface DashboardServiceFormProps extends FormProps {
  serviceId?: string;
}

export function ServiceForm({
  isOpen,
  setIsOpen,
  serviceId,
  onClose,
  mode = 'add',
}: DashboardServiceFormProps) {
  const isEdit = mode === 'edit';
  const isView = mode === 'view';

  const createServiceMutation = useCreateService();
  const updateServiceMutation = useUpdateService();

  const { data: serviceData, isLoading: isLoadingService } = useServiceById(
    (isEdit || isView) && isOpen ? serviceId : undefined
  );

  const form = useForm<ServiceCreateInput>({
    resolver: zodResolver(serviceCreateSchema),
    defaultValues: {
      name: '',
      slug: '',
      status: 'active',
      classId: [],
    },
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset({
        name: '',
        slug: '',
        status: 'active',
        classId: [],
      });
    }
  }, [isOpen, form]);

  useEffect(() => {
    if ((isEdit || isView) && isOpen && serviceData) {
      const currentService = serviceData as Record<string, unknown>;
      form.reset({
        name: currentService.name || '',
        slug: currentService.slug || '',
        status: currentService.status || 'active',
        image: currentService.image || '',
        description: currentService.description || '',
        classId: currentService.classId || [],
      });
    }
  }, [serviceData, form, isEdit, isView, isOpen]);

  const onSubmit = (values: ServiceCreateInput) => {
    const slug = values.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    if (isEdit && serviceId) {
      updateServiceMutation.mutate(
        { id: serviceId, updates: { ...values, slug } },
        {
          onSuccess: response => {
            toast.success(response.message || 'Service updated successfully');
            if (setIsOpen) setIsOpen(false);
          },
          onError: error => {
            toast.error(error.message || 'Failed to update service');
          },
        }
      );
      return;
    }

    createServiceMutation.mutate(
      { ...values, slug },
      {
        onSuccess: response => {
          toast.success(response.message || 'Service created successfully');
          form.reset();
          if (setIsOpen) setIsOpen(false);
        },
        onError: error => {
          toast.error(error.message || 'Failed to create service');
        },
      }
    );
  };

  const isLoading = createServiceMutation.isPending || updateServiceMutation.isPending;
  const formValues = form.getValues();
  const submitLabel = isEdit ? 'Update Service' : isView ? '' : 'Add Service';

  if (isLoadingService && !serviceData) {
    return <ServiceModalSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isView ? <ServiceModalView formValues={formValues} /> : <ServiceModalForm isOpen={isOpen} />}
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
