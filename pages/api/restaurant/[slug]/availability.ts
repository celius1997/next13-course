import { NextApiRequest, NextApiResponse } from "next"; 
import {times} from '../../../../data/'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const {slug, day, time, partySize} = req.query as{
        slug: string,
        day: string,
        time: string,
        partySize: string
    }
    if(!day || !partySize || !time ) {
        return res.status(400).json({
            errorMesage: 'Invalid data provided'
        })
    }

    const searchTimes = times.find(t => {
        return t.time === time;
    })?.searchTimes;
    
    if(!searchTimes) {
        return res.status(400).json({
            errorMesage: 'Invalid time provided'
        })
    }

    const bookings = await prisma.booking.findMany({
        where: {
            booking_time: {
                gte: new Date(`${day}T${searchTimes[0]}`),
                lte: new Date(`${day}T${searchTimes[searchTimes.length -1]}`)
            }
        },
        select: {
            number_of_people: true,
            booking_time: true,
            tables: true
        }
    });

    const bookingTablesObject: {[key:string]: {[key:number]: true}} = {}
    bookings.forEach(booking => {
        bookingTablesObject[booking.booking_time.toISOString()] = booking.tables.reduce((obj, table) => {
            return {
                ...obj,
                [table.table_id]:true
            }
        }, {})
    });
    
    const restaurant = await prisma.restaurant.findFirst({
        where: {
            slug
        },
        select: {
            tables: true,
            open_time: true,
            close_time: true
        }
    })

    if(!restaurant) {
        return res.status(400).json({
            errorMesage: 'Invalid data provided'
        })
    } 
    const tables = restaurant.tables;

    const searchTimesWithTables = searchTimes.map(searchTime => {
        return {
            date: new Date(`${day}T${searchTime}`),
            time: searchTime,
            tables: tables
        }
    })
    // Delete thos tables that have already been booked
    searchTimesWithTables.forEach(t => {
        t.tables = t.tables.filter(tab => {
            if (bookingTablesObject[t.date.toISOString()]){
                if(bookingTablesObject[t.date.toISOString()][tab.id]) return false
            }
            return true
        })
    })

    const availabilities = searchTimesWithTables.map( t=> {
        // Sum up the seats within the tables
        const sumSeats = t.tables.reduce((sum, table) => {
            return sum + table.seats
        }, 0);
        return {
            time: t.time,
            available: sumSeats >= parseInt(partySize)
        }
    })

    console.log(restaurant.open_time)
    console.log(restaurant.close_time)
    
    // Filter by restaurant time window
    availabilities.filter(availability => {
        const timeIsAfterOpeningHour = new Date(`${day}T${availability.time}`) >= new Date(`${day}T${restaurant.open_time}`);
        const timeIsBeforeClosingHour = new Date(`${day}T${availability.time}`) <= new Date(`${day}T${restaurant.close_time}`);
        
        return timeIsAfterOpeningHour && timeIsBeforeClosingHour
    })
    return res.json({availabilities})
    
    //return res.json({searchTimes, bookings, bookingTablesObject, tables, searchTimesWithTables, availabilities})
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-05-27&time=19:30:00.000Z&partySize=4
