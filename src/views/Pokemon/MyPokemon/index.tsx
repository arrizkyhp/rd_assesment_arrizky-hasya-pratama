import React from 'react';
import Link from 'next/link';

import Paper from '@/components/base/Paper';
import Typography from '@/components/base/Typography';
import PageHeader from '@/components/ui/PageHeader';
import PokemonCard from '@/views/Pokemon/MyPokemon/components/PokemonCard';
import useMyPokemon from '@/views/Pokemon/MyPokemon/index.hooks';

const MyPokemon = () => {
  const { data } = useMyPokemon();

  return (
    <>
      <div className="flex justify-between items-center mb-5 mt-5">
        <PageHeader
          title="My Pokemon"
          crumbs={[{ label: 'Home', href: '/' }, { label: 'My Pokemon' }]}
        />
      </div>
      <Paper className="p-10 flex flex-wrap flex-col gap-10 justify-center items-center">
        {data.length <= 0 && (
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex flex-col items-center">
              <Typography variant="h5" className="font-bold mb-2">
                You have not caught any Pokemon yet
              </Typography>
              <Link href="/">
                <Typography>Go catch one</Typography>
              </Link>
            </div>
          </div>
        )}
        {data.length > 0 && (
          <Typography className="text-center">
            You caught {data.length} Pokemon
          </Typography>
        )}
        <div className="flex flex-wrap gap-4 items-center">
          {data.length > 0 &&
            data.map((item) => <PokemonCard key={item.name} data={item} />)}
        </div>
      </Paper>
    </>
  );
};

export default MyPokemon;
