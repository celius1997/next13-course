import { findAvailableTables } from "@/services/restaurant/findAvailableTables";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
  return res.json({searchTime, tablesCount});
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?day=2023-05-27&time=19:30:00.000Z&partySize=4
