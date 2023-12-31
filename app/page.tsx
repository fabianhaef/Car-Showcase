import { Hero, SearchBar, CustomFilter, CarCard, ShowMore } from '@/components';
import { yearsOfProduction, fuels } from '@/constants';
import { HomeProps } from '@/types';
import { fetchCars } from '@/utils';

export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    limit: searchParams.limit || 10,
    fuel: searchParams.fuel || '',
    model: searchParams.model || '',
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className='home__text-container'>
          <h2 className='text-4xl font-extrabold'>Car Catalogue</h2>
          <p>Explore the cards you might like</p>
          <div className='home__filters'>
            <SearchBar />
            <div className="home__filter-container">
              <CustomFilter title="fuel" options={fuels} />
              <CustomFilter title="year" options={yearsOfProduction} />
            </div>
          </div>
          {!isDataEmpty ? (
            <section className='w-full'>
              <div className='home__cars-wrapper'>
                {allCars?.map((car) => <CarCard car={car} />)}
              </div>
              <ShowMore pageNumber={(searchParams.limit || 10) / 10} isNext={(searchParams.limit || 10) > allCars.length}/>
            </section>
          ) : (
            <div className='home__error-container'>
              <h3 className='text-black text-xl'>Oops, no results!</h3>
              <p>{allCars?.message}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
