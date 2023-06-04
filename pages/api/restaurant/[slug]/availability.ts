import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data/";
import { PrismaClient } from "@prisma/client";
import { Time } from "../../../../utils/convertToDisplayTime";
import { findAvailableTables } from "@/services/restaurant/findAvailableTables";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "GET") {
    const { slug, day, time, partySize } = req.query as {
      slug: string;
      day: string;
      time: string;
      partySize: string;
    };
  
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
    
    const availabilities = searchTimesWithTables.map((t) => {
      // Sum up the seats within the tables
      const sumSeats = t.tables.reduce((sum, table) => {
        return sum + table.seats;
      }, 0);
      return {
        time: t.time,
        available: sumSeats >= parseInt(partySize),
      };
    });
  
    // Filter by restaurant time window
    availabilities.filter((availability) => {
      const timeIsAfterOpeningHour =
        new Date(`${day}T${availability.time}`) >=
        new Date(`${day}T${restaurant.open_time}`);
      const timeIsBeforeClosingHour =
        new Date(`${day}T${availability.time}`) <=
        new Date(`${day}T${restaurant.close_time}`);
  
      return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
    });
    return res.json(availabilities);
  }

  //return res.json({searchTimes, bookings, bookingTablesObject, tables, searchTimesWithTables, availabilities})
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-05-27&time=19:30:00.000Z&partySize=4
