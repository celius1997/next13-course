"use client"
import { useState } from 'react'
import { partySize } from '../../../../data'
import DatePicker from 'react-datepicker'
import { create } from '@mui/material/styles/createTransitions'
 
 const ReservationCard = () => {
    const [selectedDate, setSelectedDate] = useState<Date| null>(new Date())
    const handleChangeDate = (date: Date | null) => {
        if(date) {
            return setSelectedDate(date)
        }
        return setSelectedDate(null)
    }
    const createSelectItems = () => {
        let items:any = [];
        partySize.map(size => {
            items.push(
                <option key={size.value} value={size.value}>{size.label}</option>
            );  
        })          
        return items;
    }
   
  return (
    <div className='w-[27%] relative'>
        <div className='fixed w-[15%] bg-white rounded p-3 shadow'>
            <div className='text-center text-reg border-b pb-2 font-bold'>
                <h4 className='mr-7 text-lg'>Make a reservation</h4>
            </div>
            <div className='my-3 flex flex-col'>
                <label htmlFor=''>Party size</label>
                <select name='' className='py-3 border-b font-light' id='party-size-select'>
                    {createSelectItems()}
                </select>
            </div>
            <div className='flex justify-between'>
                <div className='flex flex-col w-[48%]'>
                    <label htmlFor=''>Date</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleChangeDate}
                        className='py-3 border-b text-reg font-light w-20'
                        dateFormat='MMMM d'
                        wrapperClassName='w-[48%]'></DatePicker>
                </div>
                <div className='flex flex-col w-[48%]'>
                <label htmlFor=''>Time</label>
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

export default ReservationCard;