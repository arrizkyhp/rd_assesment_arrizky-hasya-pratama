import { useEffect, useState } from 'react';

import type { SelectChangeEvent } from '@mui/material';
import type { ChangeEvent, KeyboardEvent } from 'react';

import type { SelectItem } from '@/components/base/Select/index.types';
import { noop } from '@/utils';

import type { DynamicSortState, SortState, TableProps } from './index.types';

const pageSizeOptions: SelectItem[] = [
  {
    label: '10',
    value: 10,
  },
  {
    label: '20',
    value: 20,
  },
  {
    label: '50',
    value: 50,
  },
];

const useDataTable = (props: TableProps) => {
  const {
    columns,
    page = 1,
    offset = 0,
    pageSize = 10,
    onPageChange = noop,
    onOffsetChange = noop,
    onPageSizeChange = noop,
    onSortChange = noop,
  } = props || {};
  const [displayPage, setDisplayPage] = useState<number>(page);
  const [displayOffset, setDisplayOffset] = useState<number>(offset);
  const [displayPageSize, setDisplayPageSize] = useState(pageSize);

  const [sortState, setSortState] = useState<DynamicSortState>({});

  // useEffect for initializing sortable column value
  useEffect(() => {
    const initState: DynamicSortState = {};
    columns.forEach((col) => {
      if (col.sortable && col.sortKey) {
        initState[col.sortKey] = {
          active: false,
          direction: 'asc',
        };
      }
    });
    setSortState(initState);
  }, [columns]);

  // useEffect for syncing displayPage and page
  useEffect(() => {
    setDisplayPage(page);
  }, [page]);

  useEffect(() => {
    setDisplayOffset(offset);
  }, [offset]);

  const onQuickPageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) <= 1) {
      setDisplayPage(1);
    }
    setDisplayPage(Number(e.target.value));
    setDisplayOffset(Number(e.target.value) * 10);
  };

  const handleChangePage = (valDisplay: number, valOffset: number) => {
    setDisplayPage(valDisplay);
    onPageChange(valDisplay);
    setDisplayOffset(valOffset);
    onOffsetChange(valOffset);
  };

  const handlePageSizeChange = (e: SelectChangeEvent<string>) => {
    const value = Number(e.target.value);
    setDisplayPageSize(value);
    onPageSizeChange(value);
  };

  const handleSort = (columnKey: string) => {
    setSortState((prevState) => {
      let columnState: SortState;
      if (!prevState[columnKey].active) {
        columnState = {
          active: true,
          direction: 'asc',
        };
      } else {
        columnState = {
          active: true,
          direction: 'desc',
        };
      }
      if (prevState[columnKey].direction === 'desc') {
        columnState = {
          active: false,
          direction: 'asc',
        };
      }
      const newState: DynamicSortState = {};
      Object.keys(prevState).forEach((key) => {
        if (key !== columnKey) {
          newState[key] = {
            active: false,
            direction: 'asc',
          };
          return;
        }
        newState[key] = columnState;
      });
      onSortChange(
        columnState.active
          ? { key: columnKey, direction: columnState.direction }
          : { key: '', direction: '' },
      );
      return newState;
    });
  };

  const onSubmitPage = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onPageChange(displayPage);
      onOffsetChange(displayOffset);
    }
  };

  return {
    displayPage,
    displayPageSize,
    pageSizeOptions,
    sortState,
    handleChangePage,
    handlePageSizeChange,
    handleSort,
    onQuickPageChange,
    onSubmitPage,
  };
};

export default useDataTable;
