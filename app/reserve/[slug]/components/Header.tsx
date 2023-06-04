import React from 'react'


export default function Header({image, name}: {image: string, name: string}) {
  return (
    <div>
        <h3 className='font-bold'>You're almost done!</h3>
        <div className="mt-5 flex">
            <img className='w-32 h-18 rounded' src={image} alt=''></img>
            <div className="ml-4">
                <h1 className="text-3xl font-bold">{name}</h1>
                <div className="flex mt-3">
                    <p className='mr-6'>15th Sat, Apr, 2023</p>
                    <p className='mr-6'>9:00 PM</p>
                    <p className='mr-6'>3 people</p>
                </div>
            </div>
        </div>
        </div>
  )
}
