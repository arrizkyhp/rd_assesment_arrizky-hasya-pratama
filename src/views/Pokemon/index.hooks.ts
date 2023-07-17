import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { ENDPOINT } from '@/constants/apiURL';
import { updateURLQuery } from '@/helpers';
import useGetData from '@/hooks/useGetData';
import type { SortParam, TableColumn } from '@/types/tables';
import { createQueryParams } from '@/utils';
import type {
  PokemonListResponse,
  PokemonQueryParams,
} from '@/views/Pokemon/index.types';

import { INIT_QUERY_PARAMS, TABLE_COLUMNS } from './index.constants';

const usePokemonList = () => {
  const router = useRouter();
  const tableColumns: TableColumn[] = TABLE_COLUMNS;
  const [queryParams, setQueryParams] =
    useState<PokemonQueryParams>(INIT_QUERY_PARAMS);
  const initQuery = router.query;

  useEffect(() => {
    setQueryParams((prevState) => ({ ...prevState, ...initQuery }));
  }, [initQuery]);
  const updateQueryParams = (queryObject: Record<string, unknown>) => {
    setQueryParams((prevState) => {
      const newState: PokemonQueryParams = { ...prevState, ...queryObject };
      updateURLQuery(router, newState);
      return newState;
    });
  };

  const onPageChange = (val: number) => {
    updateQueryParams({ page: val });
  };

  const onOffsetChange = (val: number) => {
    updateQueryParams({ offset: val });
  };

  const onPageSizeChange = (val: number) => {
    updateQueryParams({ limit: val });
  };
  const onSortChange = (params: SortParam) => {
    const { key, direction } = params;
    onPageChange(1);
    updateQueryParams({ orderBy: key, orderType: direction });
  };

  const handleDetail = (id: string) => {
    router.push(`/${id}`);
  };

  const handleDelete = (id: string) => {
    // TODO: delete handling logic, remove disable eslint
    // eslint-disable-next-line no-console
    console.log('delete', id);
  };

  const { data, isLoading } = useGetData<PokemonListResponse>(
    ['pokemonList', createQueryParams(queryParams)],
    ENDPOINT.POKEMON,
    {
      params: queryParams,
      //   normalizer: userListNormalizer,
      options: {
        retry: 3,
      },
    },
  );

  return {
    data,
    isLoading,
    tableColumns,
    queryParams,
    handleDelete,
    handleDetail,
    onPageChange,
    onPageSizeChange,
    onOffsetChange,
    onSortChange,
  };
};

export default usePokemonList;
