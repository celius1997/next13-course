"use client"

/*  useRouter for programatic navigation i.e. putting limits to the search within the search button */
import { useRouter } from 'next/navigation'
import { useState } from 'react' 
/* Use arrow function in client component */

const SearchBar =  () => {
    const router = useRouter();
    const [location, setLocation] = useState("");
    return (
    
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
                if(location === '') return;
                router.push(`/search?city=${location.toLowerCase()}`);
                setLocation('')
            }}
        >
        LET'S GO</button>
    </div>
  )
}

export default SearchBar;
