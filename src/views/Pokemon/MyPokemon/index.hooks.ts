import { useEffect, useState } from 'react';

import type { PokemonDetailResponse } from '@/views/Pokemon/PokemonDetail/index.types';

const useMyPokemon = () => {
  const [data, setData] = useState<PokemonDetailResponse[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem('myData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
    }
  }, []);

  return {
    data,
  };
};

export default useMyPokemon;
