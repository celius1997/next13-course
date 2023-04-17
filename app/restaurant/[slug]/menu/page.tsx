import Header from "../components/Header"
import RestaurantMenu from "../components/RestaurantMenu"
import RestaurantNavBar from "../components/RestaurantNavBar"

export default function Menu() {
    return(
        <main>
        <Header/>
        {/* DESCRIPTION PORTION */}
        <div className='flex m-auto w-2/3 justify-between items-start 0 -mt-11'>
            <div className='bg-white w-[100%] rounded p-3 shadow'>
            <RestaurantNavBar/>
            <RestaurantMenu/>
            </div>
        </div>
        {/* DESCRIPTION PORTION */}
        </main>

    )
}