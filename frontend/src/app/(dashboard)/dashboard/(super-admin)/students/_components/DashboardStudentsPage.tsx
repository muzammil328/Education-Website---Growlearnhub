'use client';

import React, { useState } from 'react';
import { Button } from '@muzammil328/ui';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { Plus } from 'lucide-react';
import { toast } from '@muzammil328/ui';
import { StudentsTable } from './StudentsTable';
import { AddStudentModal } from './AddStudentModal';

type StudentRow = {
  userId: string;
  username: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  createdAt: string;
};

export default function DashboardStudentsPage() {
  const [, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');

  const [studentData, setStudentData] = useState<StudentRow[]>([]);
  const isLoading = false;

  const paginationData = {
    totalRecords: studentData.length,
    totalPages: 1,
    currentPage: 1,
    limit,
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleDelete = (studentId: string) => {
    setStudentData(prev => prev.filter(student => student.userId !== studentId));
    toast.success('Student deleted successfully');
  };

  return (
    <div className="border rounded-md pb-3">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={handleSearch}
          className="py-2 px-3 focus:outline-none h-12"
        />

        <div className="flex items-center gap-4">
          <AddStudentModal
            triggerLabel={
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Student
              </Button>
            }
          />
        </div>
      </div>

      <StudentsTable data={studentData} isLoading={isLoading} onDelete={handleDelete} />
      <div className="border-t pt-3 px-2">
        <DataTablePagination
          canPreviousPage={paginationData.currentPage > 1}
          canNextPage={paginationData.currentPage < paginationData.totalPages}
          previousPage={() => setPage(p => Math.max(1, p - 1))}
          nextPage={() => setPage(p => Math.min(paginationData.totalPages, p + 1))}
          selectedRows={studentData.length}
          totalRows={paginationData.totalRecords}
          pageCount={paginationData.totalPages}
          pageIndex={paginationData.currentPage - 1}
          pageSize={paginationData.limit}
          setPage={page => setPage(page + 1)}
        />
      </div>
    </div>
  );
}
