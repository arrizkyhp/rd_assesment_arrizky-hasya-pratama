import Link from 'next/link';

import Button from '@/components/base/Button';
import Paper from '@/components/base/Paper';
import Table from '@/components/ui/DataTable';
import PageHeader from '@/components/ui/PageHeader';
import { TABLE_ACTION } from '@/constants/tables';
import usePokemonList from '@/views/Pokemon/index.hooks';

const PokemonList = () => {
  const {
    data,
    handleDetail,
    isLoading,
    tableColumns,
    queryParams,
    onPageChange,
    onOffsetChange,
    onPageSizeChange,
    onSortChange,
  } = usePokemonList();

  return (
    <>
      <div className="flex justify-between items-center mb-5 mt-5">
        <PageHeader
          title="Pokemon List"
          crumbs={[{ label: 'Home', href: '/' }]}
        />
        <Link href="/my-pokemon">
          <Button className="h-fit" color="primary">
            My Pokemon
          </Button>
        </Link>
      </div>
      <Paper className="p-4">
        <Table
          data={(data && data.results) || []}
          columns={tableColumns}
          uniqueRowKey="name"
          loading={isLoading}
          showPagination
          page={queryParams.page}
          offset={Number(queryParams.offset)}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          onOffsetChange={onOffsetChange}
          onSortChange={onSortChange}
          rowActions={[
            {
              action: TABLE_ACTION.DETAIL,
              onClick: (id) => handleDetail(id),
            },
          ]}
        />
      </Paper>
    </>
  );
};

export default PokemonList;
