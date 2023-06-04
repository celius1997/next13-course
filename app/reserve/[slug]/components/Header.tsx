import React from 'react'
import { convertToDisplayTime, Time } from '@/utils/convertToDisplayTime'
import {format} from 'date-fns'

export default function Header({image, name, date, partySize}: {image: string, name: string, date: string, partySize: string}) {
    const time = date.split('T')[1] as Time
    const day = date.split('T')[0]
    return (
    <div>
        <h3 className='font-bold'>You're almost done!</h3>
        <div className="mt-5 flex">
            <img className='w-32 h-18 rounded' src={image} alt=''></img>
            <div className="ml-4">
                <h1 className="text-3xl font-bold">{name}</h1>
                <div className="flex mt-3">
                    <p className='mr-6'>{
                        format(new Date(date), "ccc, LLL, d")
                    }</p>
                    <p className='mr-6'>
                        {
                            convertToDisplayTime(time)
                        }
                    </p>
                    <p className='mr-6'>
                        {(parseInt(partySize) < 2) ? (
                            <div>{partySize} person</div>
                        ): (
                            <div>{partySize} people</div>
                        )}
                    </p>
                </div>
            </div>
        </div>
        </div>
  )
}
