import React from 'react';

import Typography from '@/components/base/Typography';
import type { PokemonPokedoxProps } from '@/views/Pokemon/PokemonDetail/components/PokemonPokedexData/index.types';

const PokemonPokedoxData = (props: PokemonPokedoxProps) => {
  const { abilities, typesPokemon, weight, height } = props;

  return (
    <>
      <Typography variant="h5" className="font-bold mb-2">
        Pokédex data
      </Typography>
      <table className="mb-5">
        <tbody>
          <tr>
            <th>Type</th>
            <td className="px-2">
              {' '}
              {typesPokemon?.map((item) => (
                <span key={item?.type?.name} className="capitalize">
                  {' '}
                  {item?.type?.name}
                </span>
              ))}
            </td>
          </tr>
          <tr>
            <th>Weight</th>
            <td className="px-2 py-1">{weight}</td>
          </tr>
          <tr>
            <th>Height</th>
            <td className="px-2">{height}</td>
          </tr>
          <tr>
            <th>Abilities</th>
            <td className="px-2">
              {abilities?.map((item) => (
                <Typography key={item?.ability.name}>
                  {item?.ability.name}
                  {item.is_hidden && <span> (hidden ability)</span>}
                </Typography>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PokemonPokedoxData;
