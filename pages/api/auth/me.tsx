import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import { PrismaClient } from "@prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const prisma = new PrismaClient();
    // I don't need to check if it exists, as it is checked in the middleware
    const bearerToken = req.headers['authorization'] as string
    const token = bearerToken.split(' ')[1]

    // STEP2: decode the JWT with another library besided jose: jsonwebtoken
    // We specify the type of the payload so prisma doesn't yell at us
    const payload = jwt.decode(token) as {email:string}
    if(!payload.email) {
        return res.status(401).json({errorMessage: 'Unauthorized request'})
    }
    const {email} = payload
    // In the payload we recover the users email, which is unique
    const user = await prisma.user.findFirst({
        where: {
            email
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            city: true,
            phone: true,
        }
    })

    if(!user) {
        return res.status(401).json({
            errorMessage: "User not found"
        })
    }
    return res.json({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        city: user.city,
        phone: user.phone
    })
}