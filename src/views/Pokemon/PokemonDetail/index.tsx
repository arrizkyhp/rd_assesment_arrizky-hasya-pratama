import Image from 'next/image';

import Button from '@/components/base/Button';
import Paper from '@/components/base/Paper';
import Progress from '@/components/base/Progress';
import Typography from '@/components/base/Typography';
import { Spinner } from '@/components/icons';
import PageHeader from '@/components/ui/PageHeader';
import usePokemonDetail from '@/views/Pokemon/PokemonDetail/index.hooks';

const PokemonDetail = () => {
  const { dataPokemonDetail } = usePokemonDetail();

  const imageUrl = dataPokemonDetail?.sprites?.front_default;

  return (
    <>
      <div className="flex justify-between items-center mb-6 mt-5">
        <PageHeader
          title="Pokemon List"
          crumbs={[
            { label: 'Home', href: '/' },
            { label: `${dataPokemonDetail?.name}` },
          ]}
        />
      </div>
      <Paper className="p-6 flex flex-col items-center border-8 border-black rounded-lg">
        <Typography variant="h4" as="h1" className="capitalize font-bold">
          {dataPokemonDetail?.name}
        </Typography>
        {imageUrl ? (
          <Image
            src={dataPokemonDetail?.sprites?.front_default}
            alt={dataPokemonDetail?.name}
            width="200"
            height="200"
          />
        ) : (
          <Spinner />
        )}

        <Typography variant="h5" className="font-bold">
          Pokédex data
        </Typography>
        <table className="mb-5 ">
          <tbody>
            <tr>
              <th>Type</th>
              <td>
                {' '}
                {dataPokemonDetail?.types.map((item) => (
                  <span className="capitalize"> {item?.type?.name}</span>
                ))}
              </td>
            </tr>
            <tr>
              <th>Weight</th>
              <td>{dataPokemonDetail?.weight}</td>
            </tr>
            <tr>
              <th>Height</th>
              <td>{dataPokemonDetail?.height}</td>
            </tr>
            <tr>
              <th>Abilities</th>
              <td>
                {dataPokemonDetail?.abilities.map((item) => (
                  <Typography>
                    {item?.ability.name}
                    {item.is_hidden && <span> (hidden ability)</span>}
                  </Typography>
                ))}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="w-full">
          <Typography variant="h5" className="text-left px-10 font-bold w-full">
            Base stats
          </Typography>

          <table className="flex w-full justify-between px-10  mb-10">
            <tbody className="w-full">
              {dataPokemonDetail?.stats.map((item) => (
                <tr className="flex w-full justify-between gap-6 items-center my-2 ">
                  <td className="min-w-[150px]">
                    <Typography className="capitalize">
                      {item.stat.name}
                    </Typography>
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

        <Button color="primary">Catch</Button>
      </Paper>
    </>
  );
};

export default PokemonDetail;
