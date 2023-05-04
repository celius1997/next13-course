import RestaurantNavBar from "./components/RestaurantNavBar"
import RestaurantTitle from "./components/RestaurantTitle"
import Rating from "./components/Rating"
import Description from "./components/Description"
import RestaurantImages from "./components/RestaurantImages"
import Reviews from "./components/Reviews"
import ReservationCard from "./components/ReservationCard"
import { PrismaClient, Review } from "@prisma/client"
import { notFound } from "next/navigation"

const prisma = new PrismaClient();

interface Restaurant {
    id: number;
    name: string;
    images: string[];
    description: string;
    slug: string;
    reviews: Review[];
    open_time: String;
    close_time: String;
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
            slug: true,
            reviews: true,
            open_time: true,
            close_time: true
        }
        
    });
    if(!restaurant) {
        //throw new Error('Cannot find the restaurant you are looking for');
        notFound()
    }
    return restaurant;
}
async function RestaurantDetails({
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
                <Rating reviews={restaurant.reviews}/>
                <Description description={restaurant.description}/>
                <RestaurantImages images={restaurant.images}/>
                <Reviews reviews = {restaurant.reviews}/>
            </div>

            <ReservationCard openTime = {restaurant.open_time} closeTime={restaurant.close_time}  />
        </>
    )
}

export default RestaurantDetails;