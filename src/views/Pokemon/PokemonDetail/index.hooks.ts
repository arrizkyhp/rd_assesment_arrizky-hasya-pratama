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
  const [isCatched, setIsCatched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

      setIsCatched(isDataIncluded);

      setData(JSON.parse(savedData));
    }
  }, [dataPokemonDetail]);

  const handleCatch = () => {
    if (dataPokemonDetail) {
      const newData = [...data];
      setIsLoading(true);

      setTimeout(() => {
        newData.push(dataPokemonDetail);
        setData(newData);
        localStorage.setItem('myData', JSON.stringify(newData));

        setIsCatched(true);
        setIsLoading(false);
      }, 3000);
    }
  };

  const imageUrl = dataPokemonDetail?.sprites?.front_default || '';
  const pokemonName = dataPokemonDetail?.name || '';

  return {
    dataPokemonDetail,
    handleCatch,
    isCatched,
    isLoading,
    imageUrl,
    pokemonName,
  };
};

export default usePokemonDetail;
