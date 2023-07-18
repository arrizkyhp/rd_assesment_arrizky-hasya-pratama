import Image from 'next/image';
import Link from 'next/link';

import Paper from '@/components/base/Paper';
import Typography from '@/components/base/Typography';
import type { PokemonCardProps } from '@/views/Pokemon/MyPokemon/components/PokemonCard/index.types';

import styles from './index.module.scss';

const PokemonCard = (props: PokemonCardProps) => {
  const { data } = props;
  const { name, sprites, types } = data;

  return (
    <Link href={`/${name}`} key={name}>
      <Paper className={styles.card}>
        <Typography className={styles.pokemonName}>{name}</Typography>
        <div className={styles.pokemonImage}>
          <Image
            src={sprites.front_default}
            alt={name}
            width="200"
            height="200"
          />
        </div>
        <div className={styles.pokemonType}>
          {types.map((typeItem) => (
            <Typography
              key={typeItem.type.name}
              className={styles.pokemonTypeName}
            >
              {typeItem.type.name}
            </Typography>
          ))}
        </div>
      </Paper>
    </Link>
  );
};

export default PokemonCard;
