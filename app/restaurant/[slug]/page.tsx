import Link from "next/link"
import NavBar from "../../components/NavBar"
import Header from "./components/Header"
import RestaurantNavBar from "./components/RestaurantNavBar"
import RestaurantTitle from "./components/RestaurantTitle"
import Rating from "./components/Rating"
import Description from "./components/Description"
import RestaurantImages from "./components/RestaurantImages"
import Reviews from "./components/Reviews"
import ReservationCard from "./components/ReservationCard"

export default function RestaurantDetails() {
    return(
        <>
            <div className='bg-white w-[70%] rounded p-3 shadow'>
                <RestaurantNavBar/>
                <RestaurantTitle/>
                <Rating/>
                <Description/>
                <RestaurantImages/>
                <Reviews/>
            </div>
            <ReservationCard/>
        </>
    )
}