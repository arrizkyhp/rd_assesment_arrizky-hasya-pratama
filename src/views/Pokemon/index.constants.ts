import { createColumnData } from '@/helpers';
import type { TableColumn } from '@/types/tables';
import type { PokemonQueryParams } from '@/views/Pokemon/index.types';

export const INIT_QUERY_PARAMS: PokemonQueryParams = {
  limit: 10,
  offset: '0',
  page: 1,
};

export const VEHICLE_TABLE_COLUMNS: TableColumn[] = [
  {
    name: 'User Name',
    dataKey: 'userName',
    sortable: true,
    sortKey: 'userName',
    width: 150,
  },
  createColumnData('Depo', 'branch', true, 'true'),
  createColumnData('Jenis Kendaraan', 'vehicleType', true, 'vehicleType'),
  {
    name: 'Deskripsi',
    dataKey: 'description',
    sortable: false,
    width: 180,
  },
  createColumnData('No. Polisi', 'policeNo', true, 'policeNo'),
  createColumnData('Dibuat Oleh', 'createdById', true, 'createdById'),
  createColumnData('Tgl Dibuat', 'createdDt', true, 'createdDt'),
];

export const TABLE_COLUMNS: TableColumn[] = [
  createColumnData('Name', 'name', false),
];
