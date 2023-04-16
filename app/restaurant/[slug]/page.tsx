import Link from "next/link"
import NavBar from "../../components/NavBar"

export default function RestaurantDetails() {
    return(
    
        <main className='bg-gray-100 min-h-screen w-screen'>
        <main className='max-w-screen-2xl m-auto bg-white'>
        <NavBar/>
            {/* HEADER */}
            <div className='h-96 overflow-hidden'>
                <div className='bg-center bg-gradient-to-r from-[#CFCFCF] to-[#3E3E3E] h-full flex justify-center items-center'>
                <h1 className='text-7xl text-white capitalize text-shadow text-center'>Cedrón Wine Bar</h1>
                </div>
            </div>
            {/* HEADER */}
            {/* DESCRIPTION PORTION */}
            <div className='flex m-auto w-2/3 justify-between items-start 0 -mt-11'>
            <div className='bg-white w-[70%] rounded p-3 shadow'>
                {/* RESTAURANT NAV */} 
                <nav className='flex text-reg border-b pb-2'>
                    <Link href='/restaurant/shakeshak' className='mr-7'>Overview</Link>
                    <Link href='/restaurant/shakeshak/menu' className='mr-7'>Menu</Link>
                </nav>
                {/* RESTAURANT NAV */}
                {/* TITLE */}
                <div className='mt-4 border-b pb-6'>
                <h1 className='font-bold text-6xl'>Cedrón Wine Bar</h1>
                </div>
                {/* TITLE */}
                {/* RATINGS */}
                <div className='flex items-end'>
                <div className='ratings mt-2 flex items-center'>
                <p>*****</p>
                <p className='text-reg ml-3'>4.9</p>
                </div>
                <div>
                    <p className='text-reg ml-4'>600 Reviews</p>
                </div>
                </div>
                {/* RATINGS */}
                {/* DESCRIPTION */}
                <div className='mt-4'>
                <p className='text-sm font-light'>Restaurante y Wine Bar ubicado en el corazón del barrio de La Latina, dentro de un edificio de 1850, en lo que antes era la muralla cristiana de Madrid del siglo XI.
        Cocina enfocada en el producto, de clásicos argentinos e influencia mediterránea.
        Selección de vinos ecológicos, naturales y biodinámicos, de pequeños productores. Por botella y por copa.

        -

        Restaurant and Wine Bar situated within the heart of el barrio de La Latina neighborhood, in a building of the year 1850, among wood, steel and stone, in the bossom of the former Medieval Walls of Madrid, dating to the 11th century.
        A product-oriented cuisine, of argentinian classic food with mediterranean influences.
        Great variety of organic, natural and biodynamic wines, mostly from small producers. By the bottle and by the glass.</p>
                </div>
                {/* DESCRIPTION */}
                {/* IMAGE */}
                <div>
                <h1 className='font-bold text-3xl mt-10 mb-7 border-b pb-5'>
                    5 photos
                </h1>
                <div className='flex flex-wrap'>
                    <img className='w-56 h-44 mr-1 mb-1'src='https://resizer.otstatic.com/v2/photos/xlarge/2/47025954.jpg'alt=''></img>
                    <img className='w-56 h-44 mr-1 mb-1'src='https://resizer.otstatic.com/v2/photos/xlarge/2/47025955.jpg'alt=''></img>
                    <img className='w-56 h-44 mr-1 mb-1'src='https://resizer.otstatic.com/v2/photos/xlarge/2/47025952.jpg'alt=''></img>
                    <img className='w-56 h-44 mr-1 mb-1'src='https://resizer.otstatic.com/v2/photos/xlarge/2/47025953.jpg'alt=''></img>
                    <img className='w-56 h-44 mr-1 mb-1'src='https://resizer.otstatic.com/v2/photos/xlarge/2/48465282.jpg'alt=''></img>
                </div>
                </div>
                {/* IMAGE */}
                {/* REVIEWS */}
                <div>
                <h1 className='font-bold text-3xl mt-10 mb-7 border-p pb-5'>
                    What 100 people are saying
                </h1>
                <div>
                    {/* REVIEWCARD */}
                    <div className="border-b pb-7 mb-7">
                    <div className='flex'>
                        <div className='w-1/6 flex flex-col items-center'>
                        <div className='rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center'>
                            <h2 className='text-white text-2xl'>MJ</h2>
                        </div>
                        <p className='text-center pt-1'>Michael Jordan</p>
                        </div>
                        <div className='ml-10 w-5/6'>
                        <div className='flex items-center'>
                            <div className='flex mr-5'>******</div>
                        </div>
                        <div className='mt-5'>
                            <p className='text-lg font-light'>
                            A lucky find on a Saturday evening. We were given great guidance on the menu and wine options and both proved to be excellent. We loved the salmon tartare with mango and the fish stew.
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* REVIEWCARD */}
                </div>
                </div>
                {/* REVIEWS */}
            </div>
            {/* RESERVATION CARD PORTION */}
            <div className='w-[27%] relative'>
                <div className='fixed w-[15%] bg-white rounded p-3 shadow'>
                <div className='text-center text-reg border-b pb-2 font-bold'>
                    <h4 className='mr-7 text-lg'>Make a reservation</h4>
                </div>
                <div className='my-3 flex flex-col'>
                    <label htmlFor=''>Party size</label>
                    <select name='' className='py-3 border-b font-light' id=''>
                    <option value=''>1 person</option>
                    <option value=''>2 people</option>
                    </select>
                </div>
                <div className='flex justify-between'>
                    <div className='flex flex-col w-[48%]'>
                        <label htmlFor=''>Date</label>
                        <input type='text' className='py-3 border-b font-light w-24'/>
                    </div>
                    <div className='flex flex-col w-[48%]'>
                        <label htmlFor=''>Tiime</label>
                        <select name='' id='' className='py-3 border-b font-light'>
                        <option value=''>1:00 PM</option>
                        <option value=''>2:00 PM</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div className='mt-5'>
                    <button className='bg-black rounded w-full px-4 text-white font-bold h-12'>Find a Time</button>
                    </div>
                </div>
                </div>
                
            </div>
            {/* RESERVATION CARD PORTION */}
            </div>
            {/* DESCRIPTION PORTION */}
        </main>
        </main>

    )
}