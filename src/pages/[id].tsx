import Head from 'next/head';

import { Container } from '@mui/material';

import { APP_TITLE } from '@/constants/config';
import PokemonDetail from '@/views/Pokemon/PokemonDetail';

const Home = () => (
  <>
    <Head>
      <title>{APP_TITLE}</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Container maxWidth="lg">
      <PokemonDetail />
    </Container>
  </>
);

export default Home;
