import { useState } from "react";
import axios from 'axios'

export default function useAvailability() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const fetchAvailabilities = async ({slug, partySize, day, time}: {slug:string; partySize: string; day: string; time: string}) => {
        setLoading(true)
        console.log(slug)
        console.log(partySize)
        console.log(day)
        console.log(time)
        return
        try {
            const response = await axios.get(`http://localhost:3000/api/restaurant/${slug}/availability`, {
                params: {
                    day,
                    time,
                    partySize
                }
            })
            setLoading(false)
            setData(response.data)
        } catch (error: any){
            setLoading(false)
            setError(error.response.data.errorMesage)
        }
    }
    return {
        loading,
        data,
        error,
        fetchAvailabilities
    }
}