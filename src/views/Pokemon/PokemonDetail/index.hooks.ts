import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { ENDPOINT } from '@/constants/apiURL';
import useGetData from '@/hooks/useGetData';
import type { PokemonDetailResponse } from '@/views/Pokemon/PokemonDetail/index.types';

const usePokemonDetail = () => {
  const router = useRouter();
  const getPokemonName = router.query;

  const [currentPokemonName, setCurrentPokemonName] = useState<
    string | string[] | undefined
  >('');

  useEffect(() => {
    setCurrentPokemonName(getPokemonName?.id);
  }, [getPokemonName]);

  const { data: dataPokemonDetail } = useGetData<PokemonDetailResponse>(
    ['pokemonDetail', currentPokemonName as string],
    `${ENDPOINT.POKEMON}/${currentPokemonName}`,
  );

  return {
    dataPokemonDetail,
  };
};

export default usePokemonDetail;
