export default function Reserve() {
    return (
        <main className='bg-gray-100 min-h-screen w-screen'>
          <main className='max-w-screen-2xl m-auto bg-white'>
            {/* NAVBAR */}
              <nav className='bg-white p-2 flex justify-between'>
                <a href='' className='font-bold text-gray-700 text-2xl'>
                  OpenTable
                </a>
                <div className='flex'>
                  <button className='bg-blue-400 text-white border p-1 px-4 rounded mr-3'>Sign in</button>
                  <button className='border p-1 px-4 rounded'>Sign up</button>
                </div>
              </nav>
              {/* NAVBAR END */}
              <div className="border-t h-screen">
                <div className="py-9 m-auto w-3/5">
                  {/* HEADER */}
                  <div>
                    <h3 className='font-bold'>You're almost done!</h3>
                    <div className="mt-5 flex">
                      <img className='w-32 h-18 rounded' src='https://resizer.otstatic.com/v2/photos/legacy/3/47921503.png' alt=''></img>
                      <div className="ml-4">
                        <h1 className="text-3xl font-bold">Restaurant Kato</h1>
                        <div className="flex mt-3">
                          <p className='mr-6'>15th Sat, Apr, 2023</p>
                          <p className='mr-6'>9:00 PM</p>
                          <p className='mr-6'>3 people</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* HEADER END */}
                  {/* FORM */}
                  <div className="mt-10 flex flex-wrap justify-between w-[660px]">
                    <input type="text" className="border rounded p-3 w-80 mb-4" placeholder='First Name'/>
                    <input type="text" className="border rounded p-3 w-80 mb-4" placeholder='Last Name'/>
                    <input type="text" className="border rounded p-3 w-80 mb-4" placeholder='Phone Number'/>
                    <input type="text" className="border rounded p-3 w-80 mb-4" placeholder='Email'/>
                    <input type="text" className="border rounded p-3 w-80 mb-4" placeholder='Ocassion (Optional)'/>
                    <input type="text" className="border rounded p-3 w-80 mb-4" placeholder='Requests (Optional)'/>
                    <button className="bg-black w-full p-3 font-bold rounded text-white">Complete reservation</button>
                    <p className='m-4 text-sm'>By clicking “Complete reservation” you agree to the OpenTable Terms of Use and Privacy Policy. Standard text message rates may apply. You may opt out of receiving text messages at any time.</p>
                  </div>
                  {/* FORM END */}
                </div>
              </div>
            </main>
          </main>   
    )
}