import { findAvailableTables } from "@/services/restaurant/findAvailableTables";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "POST") {
    const { slug, day, time, partySize } = req.query as {
      slug: string;
      day: string;
      time: string;
      partySize: string;
    };

    const {bookerEmail, bookerPhone, bookerFirstName, bookerLastName, bookerOcasion, bookerRequest} = req.body as {
      bookerEmail: string;
      bookerPhone: string;
      bookerFirstName: string;
      bookerLastName: string;
      bookerOcasion: string;
      bookerRequest: string;
    }

    const errors: String[] = [];
    const validationSchema = [
        {
            valid: validator.isEmail(bookerEmail),
            errorMessage: "Email is invalid"
        }
    ]
    validationSchema.forEach(check => {
        if(!check.valid){
            errors.push(check.errorMessage)
        }
    })
    if(errors.length) {
        return res
        .status(400)
        .json({errorMessage: errors[0]})
    }
  
    if (!day || !partySize || !time) {
      return res.status(400).json({
        errorMesage: "Invalid data provided",
      });
    }
  
    const restaurant = await prisma.restaurant.findFirst({
      where: {
        slug,
      },
      select: {
        id: true,
        tables: true,
        open_time: true,
        close_time: true,
      },
    });
  
    if (!restaurant) {
      return res.status(400).json({
        errorMesage: "Invalid data provided",
      });
    }
    // If the provided time is not withing the opening hours return error
    if (
      new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
      new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
    ) {
      return res.status(400).json({
        errorMesage: "Restaurant is not open at that time",
      });
    }
  
    const searchTimesWithTables = await findAvailableTables({
      time,
      day,
      restaurant,
      res,
    });
  
    if (!searchTimesWithTables) {
      return res.status(400).json({
        errorMesage: "Invalid data provided",
      });
    }
  
    // Find the actual entry, if its undefined there is no availability
    const searchTime = searchTimesWithTables.find((t) => {
      return (t.date).toISOString() === (new Date(`${day}T${time}`)).toISOString()
    })
  
    if (!searchTime) {
      return res.status(400).json({
        errorMesage: "No availability, can't book",
      });
    }
  
    //Count the tables available based on seats
    // {[num of seats]: [table Key1, table key2, ...], [nofseats]: [key1, ...]}
    // We only have tables with 2 or 4 seats
    const tablesCount: {
      2: number[],
      4: number[]
    } = {
      2:[], 
      4: []
    }
    searchTime.tables.forEach(table => {
      if(table.seats === 2){
        tablesCount[2].push(table.id)
      } else {
        tablesCount[4].push(table.id)
      }
    })
  //Determine the tables to book based on the partySize
  const numOfTables: {
    2: number[],
    4: number[]
  } = {
    2:[], 
    4: []
  }
  const seatsAvailable = tablesCount[2].length*2 +tablesCount[4].length*4;
  
  if(seatsAvailable < parseInt(partySize)) {
    return res.status(400).json({
      errorMesage: "Not enough seats available, can't book",
    });
  }
  
  const tablesToBook: number[] = [];
  let seatsRemaining = parseInt(partySize);
  
  while (seatsRemaining > 0) {
    if (seatsRemaining > 3) {
      if(tablesCount[4].length) {
        tablesToBook.push(tablesCount[4][0])
        tablesCount[4].shift()
        seatsRemaining -= 4;
      } else {
        tablesToBook.push(tablesCount[2][0])
        tablesCount[2].shift()
        seatsRemaining -= 2;
      }
    } else {
      if(seatsRemaining === 3 && tablesCount[4].length) {
        tablesToBook.push(tablesCount[4][0])
        tablesCount[4].shift()
        seatsRemaining -= 4;
      }
      else if(tablesCount[2].length) {
        tablesToBook.push(tablesCount[2][0])
        tablesCount[2].shift()
        seatsRemaining -= 2;
      } else {
        tablesToBook.push(tablesCount[4][0])
        tablesCount[4].shift()
        seatsRemaining -= 4;
      }
    }
  }

  // Create new booking in the database
  const booking = await prisma.booking.create({
    data: {
      number_of_people: parseInt(partySize),
      booking_time: new Date(`${day}T${time}`),
      booker_email: bookerEmail,
      booker_first_name: bookerFirstName,
      booker_last_name: bookerLastName,
      booker_phone: bookerPhone,
      booker_ocasion: bookerOcasion,
      booker_request: bookerRequest,
      restaurant_id: restaurant.id
    }
  })

  const bookingsOnTablesData = tablesToBook.map(table_id => {
    return {
      table_id,
      booking_id: booking.id
    }
  })

  console.log(bookingsOnTablesData)

  // Link the booking to the table ids
  await prisma.bookingsOnTables.createMany({
    data: bookingsOnTablesData
  })
  
    return res.json({booking, bookingsOnTablesData});
  }
}



// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?day=2023-05-27&time=19:30:00.000Z&partySize=4
