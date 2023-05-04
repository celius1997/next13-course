import { NextApiRequest, NextApiResponse } from "next"; 


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
            errorMesage: 'Invalid data'
        })
    }
    return res.json({slug, day, time, partySize})
}