import { Hero,SearchBar, CustomFilter, CarCard } from '@/components';
import { fetchCars } from '@/utils';

export default async function Home() {
  const allCars = await fetchCars();

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
              <CustomFilter title="fuel"/>
              <CustomFilter title="year"/>
            </div>
          </div>
          {!isDataEmpty ? (
            <section>
              <div className='home__cars-wrapper'>
                {allCars?.map((car) => <CarCard car={car} /> )}
              </div>
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
