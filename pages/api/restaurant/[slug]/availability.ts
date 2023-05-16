import { NextApiRequest, NextApiResponse } from "next"; 
import {times} from '../../../../data/times'

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
            errorMesage: 'Invalid time rpovided'
        })
    }

    return res.json({searchTimes})
}