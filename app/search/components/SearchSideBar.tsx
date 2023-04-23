import { PrismaClient, Location, Cuisine, PRICE } from '@prisma/client'
import Link from 'next/link'

interface Props {
  locations: Location[],
  cuisines: Cuisine[],
  searchParams: {city?: string, cuisine?: string, price?: PRICE}
}

const prices = [{
  price: PRICE.CHEAP,
  label: "$",
  className: 'border w-full text-center text-reg font-light rounded-l p-2'
  }, {
  price: PRICE.REGULAR,
  label: "$$",
  className: 'border w-full text-center text-reg font-light p-2'
  }, {
  price: PRICE.EXPENSIVE,
  label: "$$$",
  className: 'border w-full text-center text-reg font-light rounded-r p-2'
}]

export default function SearchSideBar({locations, cuisines, searchParams}: Props) {
    return(
        <div className='w-1/5'>
            <div className='border-b pb-4 flex flex-col'>
              <h1 className='mb-2 font-bold text-lg'>Region</h1>
              {locations.length ? 
                (locations.map(location => 
                  (<Link replace
                    href={{
                      pathname: '/search',
                      query: {
                        ...searchParams,
                        city: location.name
                      }}}>
                      <p className='capitalize' key={location.id}>{location.name}</p>
                    </Link>)))
                : (
                  <p>Sorry, we found no location</p>
                )
              }
            </div>
            <div className='border-b pb-4 mt-3'>
              <h1 className='mb-2 font-bold text-lg'>Cuisine</h1>
              {cuisines.length ? 
                (cuisines.map(c => (
                <Link replace 
                  href={{
                    pathname: '/search',
                    query: {
                      ...searchParams, // Destructurize the searchparams so we dont overwrite them
                      cuisine: c.name
                    }}}>
                      <p className='capitalize' key={c.id}>{c.name} </p>
                    </Link>)))
                : (
                  <p>Sorry, we found no cuisines</p>
                )
              }
            </div>
            <div className='mt-3 pb-4'>
              <h1 className='mb-2 font-bold text-lg'>Price</h1>
              <div className='flex'>
                {prices.map(({price, label, className}) => (
                  <Link className={className}
                    replace 
                    href={{
                      pathname: '/search',
                      query: {
                        ...searchParams, // Destructurize the searchparams so we dont overwrite them
                        price: price
                      }}}>
                        <p>{label}</p>
                </Link>
                ))}
              </div>
            </div>
          </div>
    )
}