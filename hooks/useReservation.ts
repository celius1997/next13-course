import { useState } from "react";
import axios from 'axios'

export default function useReservation() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const createReservation = async ({
        slug,
        partySize,
        day,
        time,
        bookerEmail,
        bookerPhone,
        bookerFirstName,
        bookerLastName,
        bookerOcassion,
        bookerRequest
    }: {
            slug:string;
            partySize: string;
            day: string;
            time:string;
            bookerEmail: string;
            bookerPhone: string;
            bookerFirstName: string;
            bookerLastName: string;
            bookerOcassion: string;
            bookerRequest: string
        }) => {
        setLoading(true)
        try {
            const response = await axios.post(`http://localhost:3000/api/restaurant/${slug}/reserve`,
            {
                bookerEmail,
                bookerPhone,
                bookerFirstName,
                bookerLastName,
                bookerOcassion,
                bookerRequest
            },{
                params: {
                    day,
                    time,
                    partySize
                }
            })
            setLoading(false)
        } catch (error: any){
            setLoading(false)
            setError(error.response.data.errorMesage)
        }
    }
    return {
        loading,
        error,
        fetchAvailabilities
    }
}