import type { SortParam, TableColumn } from '@/types/tables';

export interface TableProps {
  data: Array<Record<string, unknown>>;
  columns: TableColumn[];
  loading?: boolean;
  page?: number;
  offset?: number;
  pageSize?: number;
  rowActions?: ActionProps[];
  showPagination?: boolean;
  showPageSizeChanger?: boolean;
  onPageChange?: (page: number) => void;
  onOffsetChange?: (page: number) => void;
  onPageSizeChange?: (page: number) => void;
  onFilterChange?: (filter: Record<string, string>) => void;
  onSortChange?: (sortState: SortParam) => void;
  uniqueRowKey: string;
}

export interface ActionProps {
  action: string;
  danger?: boolean;
  onClick: (id: string) => void;
}
export interface SortState {
  active: boolean;
  direction: 'asc' | 'desc';
}

export interface DynamicSortState {
  [key: string]: SortState;
}
