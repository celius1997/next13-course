import { NextApiRequest, NextApiResponse } from "next";
import * as jose from 'jose'
import jwt from 'jsonwebtoken'
import { PrismaClient } from "@prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const prisma = new PrismaClient();
    //STEP1: Validate the token that the user is sending
    // We check if it has been creater by us
    const bearerToken = req.headers['authorization'] as string
    if(!bearerToken) {
        return res.status(401).json({errorMessage: 'Unauthorized request (token invalid 1)'})
    }

    const token = bearerToken.split(' ')[1]
    if(!token) {
        return res.status(401).json({errorMessage: 'Unauthorized request (token invalid 2)'})
    }
    // Verify the token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    try {
        await jose.jwtVerify(token, secret)

    } catch(err){
        return res.status(401).json({errorMessage: 'Unauthorized request (token unverified)'})
    }
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
    return res.json({user: user})
    }