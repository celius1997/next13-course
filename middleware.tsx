// This middleware is going to run before the endpoints
import { NextRequest, NextResponse } from "next/server"
import * as jose from 'jose'

export async function middleware(
    req: NextRequest,
    res: NextResponse
) {
  //STEP1: Validate the token that the user is sending
    // We check if it has been creater by us
    const bearerToken = req.headers.get('authorization') as string
    if(!bearerToken) {
        return new NextResponse(
            JSON.stringify({errorMessage: 'Unauthorized request'}), {status: 401}
        )
    }

    const token = bearerToken.split(' ')[1]
    if(!token) {
        //return res.status(401).json({errorMessage: 'Unauthorized request (token invalid 2)'})
        return new NextResponse(
            JSON.stringify({errorMessage: 'Unauthorized request'}), {status: 401}
        )
    }
    // Verify the token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    try {
        await jose.jwtVerify(token, secret)
    } catch(err){
        return new NextResponse(
            JSON.stringify({errorMessage: 'Unauthorized request'}), {status: 401}
        )
        //return res.status(401).json({errorMessage: 'Unauthorized request (token unverified)'})
    }
}

// I don't want to call it with every single request
export const config = {
    matcher: ['/api/auth/me']
}
