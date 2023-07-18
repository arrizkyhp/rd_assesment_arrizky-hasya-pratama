import React from 'react';

import Progress from '@/components/base/Progress';
import Typography from '@/components/base/Typography';
import type { PokemonStats } from '@/views/Pokemon/PokemonDetail/index.types';

type Props = {
  data: PokemonStats[];
};

const PokemonBaseStats = (props: Props) => {
  const { data } = props;

  return (
    <div className="w-full bg-amber-100 py-5 mb-8">
      <Typography
        variant="h5"
        className="text-left px-10 font-bold w-full mb-2"
      >
        Base stats
      </Typography>

      <table className="flex w-full justify-between px-10 mb-5">
        <tbody className="w-full">
          {data?.map((item) => (
            <tr
              key={item.stat.name}
              className="flex w-full justify-between gap-6 items-center my-2 "
            >
              <td className="min-w-[150px]">
                <Typography className="capitalize">{item.stat.name}</Typography>
              </td>
              <td>
                <Typography>{item.base_stat}</Typography>
              </td>
              <td className="w-full">
                <Progress value={item.base_stat} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonBaseStats;
