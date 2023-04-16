import Link from "next/link";

export default function RestaurantCard() {
    return(
    <div className='w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer'>
        <Link href='/restaurant/shakeshak'>
            <img src='https://resizer.otstatic.com/v2/photos/wide-huge/3/47025845.jpg'
            alt="Cedron Wine Bar"
            className='w-full' width={64} height={72}/>
            <div className='p-1'>
                <h3 className='font-bold text-2xl mb-2'>Cedrón Wine House</h3>
                <div className='flex items-start'>
                    <div className='flex mb-2'>*****</div>
                    <p className='ml-2'>27 Reviews</p>
                </div>
            </div>
            <div className='flex text-reg font-light capitalize'>
                <p className=' mr-3 '>Mediterranean</p>
                <p className=' mr-3'>$$$$</p>
                <p>Toronto</p>
            </div>
            <p className='text-sm mt-1 font-bold'>Booked 3 times today</p>
        </Link>
    </div>
            
    )
}