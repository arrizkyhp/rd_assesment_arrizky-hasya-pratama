export interface PaginationData<T> {
  next: string;
  previous: number;
  pageSize: string;
  count: number;
  results: T[];
}
