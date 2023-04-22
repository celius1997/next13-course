import Header from "./components/Header"
import RestaurantCard from "./components/RestaurantCard"
import SearchSideBar from "./components/SearchSideBar"
import { PrismaClient, PRICE, Location, Cuisine } from "@prisma/client"

const prisma = new PrismaClient();

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
}
const fetchRestaruantsByLocation = async (city: string | undefined) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true
  }

  if(!city) return await prisma.restaurant.findMany({select});
  const restaurants = await prisma.restaurant.findMany({
      where: {
          location: {
            name: {
              equals: city
            }
          },
      },
      select
      
  });
  if(!restaurants) {
      throw new Error();
  }
  return restaurants;
}
export default async function Search({
  searchParams,
  }: {
  searchParams: { city: string}
  }) {
    
  const restaurants = await fetchRestaruantsByLocation(searchParams.city);
    return(
    <main >
      <Header/>
      <div className='flex py-4 m-auto w-2/3 justify-between items start'>
        <SearchSideBar/>
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