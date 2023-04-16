/* Root component that is going to render when we go to the main page of our website */

'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
/* useRouter for programatic navigation i.e. putting limits to the search within the search button */
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const router = useRouter();
  const [location, setLocation] = useState('');

  return (
    <main className='bg-gray-100 min-h-screen w-screen'>
      <main className='max-w-screen-2xl m-auto bg-white'>
        {/* NAVBAR */}
          <nav className='bg-white p-2 flex justify-between'>
            <Link href='' className='font-bold text-gray-700 text-2xl'>
              OpenTable
            </Link>
            <div className='flex'>
              <button className='bg-blue-400 text-white border p-1 px-4 rounded mr-3'>Sign in</button>
              <button className='border p-1 px-4 rounded'>Sign up</button>
            </div>
          </nav>
        {/* NAVBAR */}
        <main>
          {/* HEADER */}
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
          {/* HEADER */}
          {/* CARDS */}
          <div className='py-3 px-36 mt-10 flex flex-wrap'>
            {/* CARD */}
            <div className='w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer'>
              <Link href='/restaurant/shakeshak'>
              <img src='https://resizer.otstatic.com/v2/photos/wide-huge/3/47025845.jpg'
                alt="Cedron Wine Bar"
                className='w-full' width={64} height={72}/>
              <div className='p-1'>
                <h3 className='font-bold text-2xl mb-2'>Almalibre Açaí House</h3>
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
            
            {/* CARD */}
          </div>
          {/* CARDS */}
          
        </main>
      </main>
    </main>
  )
}
