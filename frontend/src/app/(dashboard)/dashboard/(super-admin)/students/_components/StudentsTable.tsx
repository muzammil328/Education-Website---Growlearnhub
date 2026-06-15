'use client';

import React from 'react';
import { Button, Skeleton, TableBody, TableCell, TableHead, TableHeader, TableRoot as Table, TableRow } from '@muzammil328/ui';
import { Trash2 } from 'lucide-react';

interface StudentData {
  userId: string;
  username: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  createdAt: string;
}

interface StudentsTableProps {
  data: StudentData[];
  isLoading?: boolean;
  onDelete?: (id: string) => void;
}

export function StudentsTable({ data = [], isLoading, onDelete }: StudentsTableProps) {
  return (
    <Table className="mt-0">
      <TableHeader className="bg-gray-100 dark:bg-gray-800">
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Verified</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          Array.from({ length: 7 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-40" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-10 ml-auto" />
              </TableCell>
            </TableRow>
          ))
        ) : data.length > 0 ? (
          data.map(student => (
            <TableRow key={student.userId}>
              <TableCell>{student.username}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    student.isEmailVerified
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {student.isEmailVerified ? 'Verified' : 'Pending'}
                </span>
              </TableCell>
              <TableCell>{new Date(student.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => onDelete?.(student.userId)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell className="text-center" colSpan={5}>
              No students found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
