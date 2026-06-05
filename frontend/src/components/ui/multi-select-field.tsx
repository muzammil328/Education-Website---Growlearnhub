'use client'

import { useFormContext, Controller } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@muzammil328/ui'

interface MultiSelectFieldProps {
  name: string
  placeholder?: string
  options: { value: string; label: string }[]
  className?: string
}

export function MultiSelectField({ name, placeholder, options, className }: MultiSelectFieldProps) {
  const { control } = useFormContext()

  return (
    <div className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  )
}
