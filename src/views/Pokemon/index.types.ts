import type { PaginationData } from '@/types/responses';

export interface Pokemon {
  [key: string]: unknown;
  name: string;
}

export type PokemonListResponse = PaginationData<Pokemon>;

export interface PokemonQueryParams {
  [key: string]: unknown;
  limit: number;
  offset: string;
  page: number;
}
