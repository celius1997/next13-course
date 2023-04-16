"use client"
/*  useRouter for programatic navigation i.e. putting limits to the search within the search button */
import { useRouter } from 'next/navigation'
import { useState } from 'react' 

/* Use arrow function in client component */
const Header = () => {
    const router = useRouter();
    const [location, setLocation] = useState("");
    return (
        <div className='h-64 bg-gradient-to-r from-[#CFCFCF] to-[#3E3E3E]'>
            <div className='text-center mt-10'>
              <h1 className='text-white text-5xl font-bold mb-2'>Find your table for any ocassion</h1>
            </div>
            {/* SEARCHBAR */}
            <div className='rounded overflow-hidden text-lg text-left py-3 m-auto flex justify-center'>
              <input
                className='rounded mr-3 width=[470px] px-2'
                type='text'
                placeholder='State, city or town'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button className='rounded bg-black py-2 px-9 text-white'
                onClick={()=>{
                  if(location === 'banana') return;
                  router.push('/search');
                }}
              >
                Let's go</button>
            </div>
            {/* SEARCHBAR */}
          </div>
    )
}

export default Header;