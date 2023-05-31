import { times } from "@/data";
import { PrismaClient, Restaurant, Table } from "@prisma/client";
import { NextApiResponse } from "next";

const prisma = new PrismaClient();

export const findAvailableTables = async ({
  time,
  day,
  restaurant,
  res,
}: {
  time: string;
  day: string;
  restaurant: {
    tables: Table[];
    open_time: string;
    close_time: string;
  };
  res: NextApiResponse;
}) => {
  const searchTimes = times.find((t) => {
    return t.time === time;
  })?.searchTimes;

  if (!searchTimes) {
    return res.status(400).json({
      errorMesage: "Invalid time provided",
    });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  const bookingTablesObject: { [key: string]: { [key: number]: true } } = {};
  bookings.forEach((booking) => {
    bookingTablesObject[booking.booking_time.toISOString()] =
      booking.tables.reduce((obj, table) => {
        return {
          ...obj,
          [table.table_id]: true,
        };
      }, {});
  });
  
  const tables = restaurant.tables;
  const searchTimesWithTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables: tables,
    };
  });

  // Delete those tables that have already been booked
  searchTimesWithTables.forEach((t) => {
    t.tables = t.tables.filter((tab) => {
      if (bookingTablesObject[t.date.toISOString()]) {
        if (bookingTablesObject[t.date.toISOString()][tab.id]) return false;
      }
      return true;
    });
  });

  return searchTimesWithTables;
};
