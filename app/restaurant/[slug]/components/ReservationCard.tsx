
export default function ReservationCard() {
  return (
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
  )
}
