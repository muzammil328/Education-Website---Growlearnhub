import React from 'react';

import { FormControl, FormField, FormItem, FormLabel, FormMessage, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@muzammil328/ui';
import { IpropsBook } from '@/types/book.types';

export default function Selectform({
  control,
  books,
  bookLoading,
  bookError,
}: {
  control: unknown; // Replace `any` with the actual type for your control
  books: Array<IpropsBook> | null; // Adjust `BookType` to match your book object structure
  bookLoading: boolean;
  bookError: { message?: string } | null; // Or appropriate error type
}) {
  return (
    <FormField
      control={control}
      name="book"
      render={({ field }) => (
        <FormItem>
          {bookLoading ? (
            <FormLabel>Loading...</FormLabel>
          ) : bookError ? (
            <FormLabel>{`Error: ${bookError.message}`}</FormLabel>
          ) : (
            <FormLabel>class</FormLabel>
          )}
          <Select onValueChange={field.onChange} defaultValue={field.value || ''}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a book" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {books &&
                books.map((data: IpropsBook) => (
                  <SelectItem key={data.id} value={data.id.toString()}>
                    {data.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
