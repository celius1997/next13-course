import Header from "./components/Header"
import RestaurantCard from "./components/RestaurantCard"
import SearchSideBar from "./components/SearchSideBar"
import { PrismaClient, PRICE, Location, Cuisine } from "@prisma/client"

const prisma = new PrismaClient();

interface SearchParams {city?: string, cuisine?: string, price?: PRICE }

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
}
const fetchRestaruantsByLocation = async (searchParams: SearchParams) => {
  const where: any = {};
  if(searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase()
      }
    }
    where.location = location
  }
  if(searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase()
      }
    }
    where.cuisine = cuisine
  }
  if(searchParams.price) {
    const price = {
      equals: searchParams.price
    }
    where.price = price
  }
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true
  }
  const restaurants = await prisma.restaurant.findMany({
    where,
    select
  })

  if(!restaurants) {
      throw new Error();
  }
  return restaurants;
}

const fetchLocations = async() => {
  const locations = await prisma.location.findMany();
  if(!locations) {
    throw new Error();
}
return locations;
}
const fetchCuisines = async() => {
  const cuisines = await prisma.cuisine.findMany();
  if(!cuisines) {
    throw new Error();
}
return cuisines;
}

export default async function Search({
  searchParams,
  }: {
  searchParams: SearchParams
  }) {
    
  const restaurants = await fetchRestaruantsByLocation(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();
    return(
    <main >
      <Header/>
      <div className='flex py-4 m-auto w-2/3 justify-between items start'>
        <SearchSideBar
        locations = {locations}
        cuisines={cuisines}
        searchParams = {searchParams}/>
        <div className='w-5/6'>
        {restaurants.length ? (
          restaurants.map(restaurant => (
            <RestaurantCard restaurant = {restaurant}/>
          ))
        ): (
          <p>Sorry, we found no restaurants in this area</p>
        )}
        </div>
      </div>
    </main>   
    )
}