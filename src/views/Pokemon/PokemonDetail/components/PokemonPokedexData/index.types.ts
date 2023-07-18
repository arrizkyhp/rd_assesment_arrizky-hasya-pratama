import type {
  PokemonAbilities,
  PokemonTypes,
} from '@/views/Pokemon/PokemonDetail/index.types';

export type PokemonPokedoxProps = {
  abilities?: PokemonAbilities[];
  typesPokemon?: PokemonTypes[];
  weight?: number;
  height?: number;
};
