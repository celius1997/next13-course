
/* Root component that is going to render when we go to the main page of our website */
/* Server component */
import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'
import { PrismaClient, Cuisine, Location, PRICE, Review } from '@prisma/client'
const prisma = new PrismaClient();

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
  reviews: Review[];
}

const fetchRestaurants = async(): Promise<RestaurantCardType[]> => {
  const allRestuarants = await prisma.restaurant.findMany({
    select: {
      id:true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      reviews: true,
      slug: true
    }
  });
  return allRestuarants;
}
export default async function Home() {
  const restaurants = await fetchRestaurants();
  return (
    <main>
      <Header/>
      <div className='py-3 px-36 mt-10 flex flex-wrap'>
        {restaurants.map( (restaurant) => (
          <RestaurantCard restaurant={restaurant} key={restaurant.id}/>
        ))}
        
      </div>
    </main>
  )
}

