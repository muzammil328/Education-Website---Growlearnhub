'use client'

import { useState, type KeyboardEvent } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { X } from 'lucide-react'

interface TagFieldProps {
  name: string
  label: string
  placeholder?: string
}

export function TagField({ name, label, placeholder }: TagFieldProps) {
  const { control } = useFormContext()
  const [inputValue, setInputValue] = useState('')

  return (
    <div>
      <label className="text-sm font-medium mb-1 block">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const tags: string[] = field.value || []

          const addTag = () => {
            const trimmed = inputValue.trim()
            if (trimmed && !tags.includes(trimmed)) {
              field.onChange([...tags, trimmed])
            }
            setInputValue('')
          }

          const removeTag = (tag: string) => {
            field.onChange(tags.filter((t) => t !== tag))
          }

          const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTag()
            }
          }

          return (
            <div className="border rounded-md p-2 flex flex-wrap gap-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-primary/10 text-primary text-sm px-2 py-0.5 rounded flex items-center gap-1"
                >
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={addTag}
                placeholder={placeholder}
                className="flex-1 min-w-[120px] outline-none text-sm bg-transparent"
              />
            </div>
          )
        }}
      />
    </div>
  )
}
