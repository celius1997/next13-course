import { PrismaClient } from "@prisma/client"
import RestaurantMenu from "../components/RestaurantMenu"
import RestaurantNavBar from "../components/RestaurantNavBar"

const prisma = new PrismaClient();

const fetchRestaurnatMenu = async(slug: string) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug,
        },
        select: {
            items: true
        }
    })

    if(!restaurant){
        throw new Error;
    }

    return restaurant.items;
}
export default async function Menu({
    params}: {
        params: {slug: string}
    }) {
    const menu = await fetchRestaurnatMenu(params.slug);
    return(
        <>
        <div className='bg-white w-[100%] rounded p-3 shadow'>
        <RestaurantNavBar slug={params.slug}/>
        <RestaurantMenu menu={menu}/>
        </div>
        </>

    )
}