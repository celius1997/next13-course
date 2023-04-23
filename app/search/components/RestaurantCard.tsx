import Link from "next/link";
import {RestaurantCardType} from "../page";
import Price from "../../components/Price";
import { Review } from "@prisma/client";
import { calculateReviewRatingAverage } from "@/utils/calculateReviewRatingAverage";

interface Props {
    restaurant : RestaurantCardType;
}

const ratingText = (reviews: Review[]) => {
    const rating = calculateReviewRatingAverage(reviews);
    if(rating > 4) return "Awesome"
    else if (rating <=4 && rating > 3) return "Good"
    else if (rating <=3 && rating > 0) return "Average"
    else return ""
}
export default function RestaurantCard({restaurant}: Props) {
    return(
        <div className='border-b flex pb-5'>
            <img className='w-44 h-36 rounded' src={restaurant.main_image} alt='' ></img>
            <div className='pl-5'>
                <h2 className='text-3xl'>{restaurant.name}</h2>
                <div className='flex items-start'>
                    <div className='flex mb-2'>****</div>
                    <p className='ml-2 text-sm'>{ratingText(restaurant.reviews)}</p>
                </div>
                <div className="mb-9">
                    <div className="font-light flex text-reg">
                        <Price price={restaurant.price}></Price>
                        <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
                        <p className="mr-4 capitalize">{restaurant.location.name}</p>
                    </div>
                </div>
                <div className='text-blue-400'>
                    <Link href={`restaurant/${restaurant.slug}`}>View more information</Link>
                </div>
            </div>
        </div>
    )
}