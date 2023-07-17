import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { ReactSVG } from 'react-svg';

import Button from '@/components/base/Button';
import Select from '@/components/base/Select';
import TextField from '@/components/base/Textfield';
import Typography from '@/components/base/Typography';
import { Spinner } from '@/components/icons';
import useDataTable from '@/components/ui/DataTable/index.hooks';
import type { TableProps } from '@/components/ui/DataTable/index.types';
import { TABLE_ACTION } from '@/constants/tables';

const DataTable = (props: TableProps) => {
  const {
    columns,
    data,
    loading = false,
    page = 1,
    offset = 0,
    pageSize = 10,
    rowActions = [],
    showPageSizeChanger = true,
    showPagination = false,
    uniqueRowKey,
  } = props;

  const {
    displayPage,
    pageSizeOptions,
    displayPageSize,
    handlePageSizeChange,
    sortState,
    handleChangePage,
    handleSort,
    onQuickPageChange,
    onSubmitPage,
  } = useDataTable(props);

  console.log(pageSize);

  const emptyState = {
    title: 'Mohon maaf, Pencarian tidak ditemukan',
    message: 'Mohon cek kembali kata kunci dan filter yang anda masukkan',
  };

  return (
    <div className="rounded-xl shadow-inner border-solid border border-neutral-300">
      {showPageSizeChanger && (
        <div className="p-4 text-sm text-neutral-600 flex items-center">
          <Typography as="span">Show </Typography>
          <Select
            className="inline-block mx-2"
            value={displayPageSize}
            options={pageSizeOptions}
            onChange={handlePageSizeChange}
            size="small"
          />
          <Typography as="span"> data</Typography>
        </div>
      )}
      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple table"
        className="table-fixed w-full"
      >
        <TableHead>
          <TableRow className="bg-neutral-300">
            <TableCell className="font-bold text-gray-500" width={40}>
              No.
              {' '}
            </TableCell>
            {columns.map((column) => (
              <TableCell
                className="first:rounded-tl-xl last:rounded-tr-xl"
                sortDirection="asc"
                key={column.dataKey}
                classes={{ root: 'break-words' }}
                width={column.width}
              >
                {column.sortable
                && column.sortKey
                && Object.keys(sortState).length ? (
                    <TableSortLabel
                      active={sortState[column.sortKey].active}
                      direction={sortState[column.sortKey].direction}
                      onClick={() => handleSort(column.sortKey || '')}
                    >
                      {column.name}
                    </TableSortLabel>
                  ) : (
                    column.name
                  )}
              </TableCell>
            ))}
            {rowActions.length > 0 && (
              <TableCell className="font-bold text-gray-500" width={80}>
                Detail
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={columns.length + 3}>
                <div className="flex justify-center items-center w-full min-h-[500px]">
                  <Spinner width={80} height={80} />
                </div>
              </TableCell>
            </TableRow>
          )}
          {!loading && data.length ? (
            data.map((row, i) => (
              <TableRow
                key={String(row[uniqueRowKey])}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="td" scope="row" className="break-words">
                  <Typography
                    as="span"
                    className="bg-gray-300 py-1 px-2 rounded-md"
                  >
                    {page * pageSize - pageSize + i + 1}
                  </Typography>
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    component="td"
                    scope="row"
                    key={`${column.dataKey}-${row[column.dataKey]}-${
                      row[uniqueRowKey]
                    }`}
                    className="break-words"
                  >
                    {row[column.dataKey] ? String(row[column.dataKey]) : '-'}
                  </TableCell>
                ))}
                {rowActions.map((item) => (
                  <TableCell
                    key={item.action}
                    className={`${item.danger && 'text-danger-500'}`}
                  >
                    {item.action === TABLE_ACTION.DETAIL && (
                      <Button
                        className="bg-transparent pb-0 pt-1 px-1 border-0"
                        onClick={() => item.onClick(String(row[uniqueRowKey]))}
                      >
                        <ReactSVG src="/svg/ic_pokemon.svg" />
                      </Button>
                    )}
                  </TableCell>
                ))}
                {/* {rowActions.length > 0 && (
                  <TableCell align="center">
                    <DropdownButton
                      buttonType="dots"
                      className="p-2"
                      size="small"
                      menuItems={rowActions.map((el) => ({
                        label: el.label,
                        danger: el.danger,
                        onClick: () => el.onClick(String(row[uniqueRowKey])),
                      }))}
                    >
                      Action
                    </DropdownButton>
                  </TableCell>
                )} */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 3}>
                <div className="text-center p-24">
                  <Typography variant="h6">{emptyState.title}</Typography>
                  <Typography>{emptyState.message}</Typography>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {showPagination && (
        <div className="flex flex-row justify-end items-center p-4 [&>*]:mx-1 border-0 border-t border-solid border-neutral-300">
          <Button
            className="p-1 min-w-0 w-8"
            disabled={Number(page) === 1 || !page}
            onClick={() => handleChangePage(Number(page) - 1, Number(offset) - 10)}
            variant="outline"
          >
            &lt;
          </Button>
          <TextField
            type="number"
            placeholder="Page"
            value={String(displayPage || '')}
            size="small"
            className="m-0 w-14"
            onKeyUp={onSubmitPage}
            onChange={onQuickPageChange}
          />
          <Button
            className="p-1 min-w-0 w-8"
            onClick={() => handleChangePage(Number(page) + 1, Number(offset) + 10)}
            disabled={data.length < pageSize}
            variant="outline"
          >
            &gt;
          </Button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
