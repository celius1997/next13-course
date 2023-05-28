"use client"
import { useState } from 'react'
import { partySize as partySizes, times } from '@/data'
import DatePicker from 'react-datepicker'
import useAvailability from '@/hooks/useAvailability'
import { CircularProgress } from '@mui/material'
import Link from 'next/link'
 
interface Props {
    openTime: string,
    closeTime: string,
    slug: string
}
 const ReservationCard = ({openTime, closeTime, slug}: Props) => {
    const {data, loading, error, fetchAvailabilities} = useAvailability()
    const [selectedDate, setSelectedDate] = useState<Date| null>(new Date())
    const [time, setTime] = useState(openTime)
    const [partySize, setPartySize] = useState("2")
    const [day, setDay] = useState(new Date().toISOString().split('T')[0])

    const handleChangeDate = (date: Date | null) => {
        if(date) {
            // 2023-07-02T12:00:00:000Z Extract the day from the Date object
            setDay(date.toISOString().split('T')[0])
            return setSelectedDate(date)
        }
        return setSelectedDate(null)
    }
    // Call the endpoint to check the availability times for that specific restaurant
    const handleClick = () => {
        fetchAvailabilities({
            slug: slug,
            day: day,
            time: time,
            partySize: partySize
        })
    }
    const createSelectDates = () => {
        let items:any = [];
        partySizes.map(size => {
            items.push(
                <option key={size.value} value={size.value}>{size.label}</option>
            );  
        })          
        return items;
    }
    const createSelectTimes = () => {
        let items:any = [];
        let filteredTimes = filterTimesByRestaurantOpenWindow()
        filteredTimes.map(t => {
            items.push(
                <option key={t.time} value={t.time}>{t.displayTime}</option>
            );  
        })          
        return items;
    }
    const filterTimesByRestaurantOpenWindow = () => {
        return times.filter(t => t.time >= openTime && t.time <= closeTime);
    }
   
  return (
    <div className='w-[27%] relative'>
        <div className='fixed w-[15%] bg-white rounded p-3 shadow'>
            <div className='text-center text-reg border-b pb-2 font-bold'>
                <h4 className='mr-7 text-lg'>Make a reservation</h4>
            </div>
            <div className='my-3 flex flex-col'>
                <label htmlFor=''>Party size</label>
                <select
                    name=''
                    className='py-3 border-b font-light'
                    id='party-size-select'
                    value={partySize}
                    onChange={(e) => setPartySize(e.target.value)}>
                        {createSelectDates()}
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
                <select name='' id='' className='py-3 border-b font-light' value={time} onChange={(e) => setTime(e.target.value)}>
                    {createSelectTimes() }
                </select>
            </div>
        </div>
        <div>
            <div className='mt-5'>
                <button className='bg-black rounded w-full px-4 text-white font-bold h-12'
                onClick={handleClick}
                disabled={loading}>
                    {loading ? <CircularProgress color='inherit'/> : 'Find a Time'}
                </button>
            </div>
        </div>
        {data && data.length ? (
            <div className='mt-4'>
                <p className='text-reg'>Select a Time</p>
                <div className='flex flex-wrap mt-2'>
                    {data.map(time => {
                        return time.available ? 
                        <Link 
                        className='bg-blue-400 cursor-pointer p-2 w-24 text-white text-center mb-3 mr-3 rounded'
                        href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}>
                            <p className='text-sm font-bold'>{time.time}</p>
                        </Link> : <p className='bg-gray-200 p-2 w-24 p-3 mb-3 mr-3 rounded'></p>
                    })}
                </div>
            </div>
        ) : null}  
        </div>
        
    </div>
  )
}

export default ReservationCard;