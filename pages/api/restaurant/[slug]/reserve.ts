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
    console.log(t.date)
    //console.log(time)
    console.log((new Date(`${day}T${time}`)).toISOString())
    return (t.date).toISOString() === (new Date(`${day}T${time}`)).toISOString()
  })

  if (!searchTime) {
    return res.status(400).json({
      errorMesage: "No availability, can't book",
    });
  }

  return res.json(
   searchTime);
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?day=2023-05-27&time=19:30:00.000Z&partySize=4
