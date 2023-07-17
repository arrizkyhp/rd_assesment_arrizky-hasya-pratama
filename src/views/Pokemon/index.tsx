import Paper from '@/components/base/Paper';
import Table from '@/components/ui/DataTable';
import PageHeader from '@/components/ui/PageHeader';
import { TABLE_ACTION } from '@/constants/tables';
import usePokemonList from '@/views/Pokemon/index.hooks';

const PokemonList = () => {
  const {
    data,
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
      <div className="flex justify-between items-center mb-6">
        <PageHeader
          title="Pokemon List"
          crumbs={[{ label: 'Home', href: '/' }, { label: 'CRUD List' }]}
        />
        {/* <Link href="/crud-example/create">
          <Button className="h-fit" color="primary" startIcon={<Add />}>
            Add Vehicle
          </Button>
        </Link> */}
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
              onClick: (id) => console.log(id),
            },
          ]}
        />
      </Paper>
    </>
  );
};

export default PokemonList;
