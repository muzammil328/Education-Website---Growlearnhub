'use client'

import { Button } from '@muzammil328/ui'

interface DataTablePaginationProps {
  canPreviousPage: boolean
  canNextPage: boolean
  previousPage: () => void
  nextPage: () => void
  selectedRows: number
  totalRows: number
  pageCount: number
  pageIndex: number
  pageSize: number
  setPage: (page: number) => void
}

export function DataTablePagination({
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
  selectedRows,
  totalRows,
  pageCount,
  pageIndex,
  pageSize,
  setPage,
}: DataTablePaginationProps) {
  const startRow = pageIndex * pageSize + 1
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows)

  return (
    <div className="flex items-center justify-between px-2 py-3">
      <div className="text-sm text-muted-foreground">
        Showing {startRow} to {endRow} of {totalRows} entries
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(0)}
          disabled={!canPreviousPage}
        >
          {'<<'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={previousPage}
          disabled={!canPreviousPage}
        >
          {'<'}
        </Button>
        <span className="text-sm">
          Page {pageIndex + 1} of {pageCount}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={!canNextPage}
        >
          {'>'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </Button>
      </div>
    </div>
  )
}
