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
    
        <main className='bg-gray-100 min-h-screen w-screen'>
        <main className='max-w-screen-2xl m-auto bg-white'>
        <NavBar/>
        <Header/>
            {/* DESCRIPTION PORTION */}
            <div className='flex m-auto w-2/3 justify-between items-start 0 -mt-11'>
                <div className='bg-white w-[70%] rounded p-3 shadow'>
                    <RestaurantNavBar/>
                    <RestaurantTitle/>
                    <Rating/>
                    <Description/>
                    <RestaurantImages/>
                    <Reviews/>
                </div>
                <ReservationCard/>
            </div>
            {/* DESCRIPTION PORTION */}
        </main>
        </main>

    )
}