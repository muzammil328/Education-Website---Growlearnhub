'use client'

import { useFormContext, Controller } from 'react-hook-form'
import { Textarea } from '@muzammil328/ui'

interface TextareaFieldProps {
  name: string
  label: string
  placeholder?: string
}

export function TextareaField({ name, label, placeholder }: TextareaFieldProps) {
  const { control } = useFormContext()

  return (
    <div>
      <label className="text-sm font-medium mb-1 block">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Textarea
            value={field.value || ''}
            onChange={field.onChange}
            placeholder={placeholder}
          />
        )}
      />
    </div>
  )
}
