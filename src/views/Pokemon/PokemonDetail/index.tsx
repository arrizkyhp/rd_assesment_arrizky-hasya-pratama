import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/base/Button';
import Paper from '@/components/base/Paper';
import Typography from '@/components/base/Typography';
import { Spinner } from '@/components/icons';
import PageHeader from '@/components/ui/PageHeader';
import PokemonBaseStats from '@/views/Pokemon/PokemonDetail/components/PokemonBaseStats';
import PokemonPokedoxData from '@/views/Pokemon/PokemonDetail/components/PokemonPokedexData';
import usePokemonDetail from '@/views/Pokemon/PokemonDetail/index.hooks';
import type { PokemonStats } from '@/views/Pokemon/PokemonDetail/index.types';

import styles from './index.module.scss';

const PokemonDetail = () => {
  const {
    dataPokemonDetail,
    handleCatch,
    isLoading,
    isCatched,
    imageUrl,
    pokemonName,
  } = usePokemonDetail();

  const { name, types, weight, height, abilities, stats } =
    dataPokemonDetail || {};

  return (
    <>
      <div className={styles.header}>
        <PageHeader
          title="Pokemon List"
          crumbs={[{ label: 'Home', href: '/' }, { label: `${name}` }]}
        />
      </div>
      <Paper className={styles.paper}>
        <Typography variant="h4" as="h1" className={styles.pokemonName}>
          {dataPokemonDetail?.name}
        </Typography>
        {imageUrl ? (
          <Image src={imageUrl} alt={pokemonName} width="200" height="200" />
        ) : (
          <Spinner />
        )}

        <PokemonPokedoxData
          typesPokemon={types}
          abilities={abilities}
          weight={weight}
          height={height}
        />

        <PokemonBaseStats data={stats as PokemonStats[]} />

        {isCatched && (
          <div className={styles.caught}>
            <Typography className="font-bold">
              You already caught this Pokemon
            </Typography>{' '}
            <Typography>
              Check in{' '}
              <Link className={styles.caughtLink} href="/my-pokemon">
                {' '}
                My Pokemon
              </Link>
            </Typography>
          </div>
        )}

        {!isCatched && (
          <Button color="primary" onClick={() => handleCatch()}>
            {isLoading ? <Spinner /> : <span>Catch</span>}
          </Button>
        )}
      </Paper>
    </>
  );
};

export default PokemonDetail;
