import RestaurantNavBar from "./components/RestaurantNavBar"
import RestaurantTitle from "./components/RestaurantTitle"
import Rating from "./components/Rating"
import Description from "./components/Description"
import RestaurantImages from "./components/RestaurantImages"
import Reviews from "./components/Reviews"
import ReservationCard from "./components/ReservationCard"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

interface Restaurant {
    id: number;
    name: string;
    images: string[];
    description: string;
    slug: string;
}

const fetchRestaruantBySlug = async (slug: string): Promise<Restaurant> => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug,
        },
        select: {
            id: true,
            name: true,
            images: true,
            description: true,
            slug: true
        }
        
    });
    if(!restaurant) {
        throw new Error();
    }
    return restaurant;
}
export default async function RestaurantDetails({
    params,
}: {
    params: {slug: string}
}) {
    const restaurant = await fetchRestaruantBySlug(params.slug);
    return(
        <>
            <div className='bg-white w-[70%] rounded p-3 shadow'>
                <RestaurantNavBar slug={restaurant.slug}/>
                <RestaurantTitle name={restaurant.name}/>
                <Rating/>
                <Description description={restaurant.description}/>
                <RestaurantImages images={restaurant.images}/>
                <Reviews/>
            </div>

            <ReservationCard/>
        </>
    )
}