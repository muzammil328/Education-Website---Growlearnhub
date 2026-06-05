'use client'

import { useFormContext, Controller } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@muzammil328/ui'

interface SelectFieldProps {
  name: string
  placeholder?: string
  options: { value: string; label: string }[]
  label?: string
  className?: string
}

export function SelectField({ name, placeholder, options, label, className }: SelectFieldProps) {
  const { control } = useFormContext()

  return (
    <div className={className}>
      {label && <label className="text-sm font-medium mb-1 block">{label}</label>}
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
