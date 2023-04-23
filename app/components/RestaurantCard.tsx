import Link from "next/link";
import { RestaurantCardType } from "../page";
import Price from './Price';
import Stars from "./Stars";
import Image from "next/image";

interface Props {
    restaurant : RestaurantCardType;
}

export default function RestaurantCard({restaurant}: Props) {
    return(
    <div className='w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer bg-white'>
        <Link href={`/restaurant/${restaurant.slug}`}>
            <img src={restaurant.main_image}
            alt={restaurant.name}
            className='w-full' width={64} height={72}/>
            <div className='p-1'>
                <h3 className='font-bold text-2xl mb-2'>{restaurant.name}</h3>
                <div className='flex items-start'>
                    <Stars reviews={restaurant.reviews}/>
                    <p className='ml-2'>{restaurant.reviews.length} Reviews</p>
                </div>
            </div>
            <div className='flex text-reg font-light capitalize'>
                <p className=' mr-3 '>{restaurant.cuisine.name}</p>
                <Price price={restaurant.price}></Price>
                <p>{restaurant.location.name}</p>
            </div>
            <p className='text-sm mt-1 font-bold'>Booked 3 times today</p>
        </Link>
    </div>
            
    )
}