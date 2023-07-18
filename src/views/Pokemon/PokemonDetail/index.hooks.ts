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
  const [data, setData] = useState<PokemonDetailResponse[]>([]);
  const [isCatched, setIsCacthed] = useState<boolean>(false);

  useEffect(() => {
    setCurrentPokemonName(getPokemonName?.id);
  }, [getPokemonName]);

  const { data: dataPokemonDetail } = useGetData<PokemonDetailResponse>(
    ['pokemonDetail', currentPokemonName as string],
    `${ENDPOINT.POKEMON}/${currentPokemonName}`,
    {
      options: {
        enabled: !!currentPokemonName,
      },
    },
  );

  // Retrieve localStorage data
  useEffect(() => {
    const savedData = localStorage.getItem('myData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);

      const isDataIncluded = parsedData.some(
        (item: PokemonDetailResponse) => item.name === dataPokemonDetail?.name,
      );

      setIsCacthed(isDataIncluded);

      console.log('Data included in localStorage:', isDataIncluded);

      setData(JSON.parse(savedData));
    }
  }, [dataPokemonDetail]);

  const handleCatch = () => {
    if (dataPokemonDetail) {
      const newData = [...data];

      newData.push(dataPokemonDetail);

      setData(newData);
      localStorage.setItem('myData', JSON.stringify(newData));

      setIsCacthed(true);
    }
  };

  return {
    dataPokemonDetail,
    handleCatch,
    isCatched,
  };
};

export default usePokemonDetail;
