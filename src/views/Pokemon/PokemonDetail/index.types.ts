export interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
  };
}

export interface PokemonAbilities {
  ability: {
    name: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSprites {
  front_default: string;
}

export interface PokemonTypes {
  slot: number;
  type: {
    name: string;
  };
}

export interface PokemonDetailResponse {
  abilities: PokemonAbilities[];
  name: string;
  base_experience: number;
  sprites: PokemonSprites;
  stats: PokemonStats[];
  types: PokemonTypes[];
  weight: number;
  height: number;
}
