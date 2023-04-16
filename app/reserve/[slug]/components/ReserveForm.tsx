
export default function ReserveForm() {
  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
        <input type="text" className="border rounded p-3 w-80 mb-4" placeholder='First Name'/>
        <input type="text" className="border rounded p-3 w-80 mb-4" placeholder='Last Name'/>
        <input type="text" className="border rounded p-3 w-80 mb-4" placeholder='Phone Number'/>
        <input type="text" className="border rounded p-3 w-80 mb-4" placeholder='Email'/>
        <input type="text" className="border rounded p-3 w-80 mb-4" placeholder='Ocassion (Optional)'/>
        <input type="text" className="border rounded p-3 w-80 mb-4" placeholder='Requests (Optional)'/>
        <button className="bg-black w-full p-3 font-bold rounded text-white">
          Complete reservation
        </button>
        <p className='m-4 text-sm'>By clicking “Complete reservation” you agree to the OpenTable Terms of Use and Privacy Policy. Standard text message rates may apply. You may opt out of receiving text messages at any time.</p>
    </div>
  )
}
