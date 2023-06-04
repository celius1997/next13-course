"use client"
import useReservation from "@/hooks/useReservation"
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import { useState, useEffect} from "react"

export default function ReserveForm({
  slug, date, partySize
}: {
  slug: string;
  date: string;
  partySize: string;
}) {
  const [didBook, setDidBook] = useState(false);
  const [day, time] = date.split('T');
  const [inputs, setInputs] = useState({
      bookerEmail: "",
      bookerPhone: "",
      bookerFirstName: "",
      bookerLastName: "",
      bookerOcassion: "",
      bookerRequest: ""
  })
  const [disabled, setDisabled] = useState(true)
  const {error, loading, createReservation} = useReservation()
  const handleClick = async() => {
    const booking = await createReservation({
      slug,
      time,
      day,
      partySize,
      bookerEmail: inputs.bookerEmail,
      bookerPhone: inputs.bookerPhone,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerOcassion: inputs.bookerOcassion,
      bookerRequest: inputs.bookerRequest,
      setDidBook: setDidBook
    })
  }

  // Handler to update the input props
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }
  //Functions to control the Sign In / Sign Up button disable and enable
  useEffect(() => {
    if(inputs.bookerEmail && inputs.bookerFirstName && inputs.bookerLastName && inputs.bookerPhone){
      return setDisabled(false)
    }
    setDisabled(true)
  }, [inputs])
  
  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
        {didBook ? <div>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Your reservation is cofirmed! <strong>We are waiting for you</strong>
          </Alert>
        </div> : 
        <>
          <input type="text" name = "bookerFirstName" className="border rounded p-3 w-80 mb-4" placeholder='First Name' value = {inputs.bookerFirstName} onChange={handleChangeInput}/>
          <input type="text" name = "bookerLastName" className="border rounded p-3 w-80 mb-4" placeholder='Last Name' value = {inputs.bookerLastName} onChange={handleChangeInput}/>
          <input type="text" name = "bookerEmail" className="border rounded p-3 w-80 mb-4" placeholder='Email' value = {inputs.bookerEmail} onChange={handleChangeInput}/>
          <input type="text" name = "bookerPhone" className="border rounded p-3 w-80 mb-4" placeholder='Phone Number' value = {inputs.bookerPhone} onChange={handleChangeInput}/>
          <input type="text" name = "bookerOcassion" className="border rounded p-3 w-80 mb-4" placeholder='Ocassion (Optional)' value = {inputs.bookerOcassion} onChange={handleChangeInput}/>
          <input type="text" name = "bookerRequest" className="border rounded p-3 w-80 mb-4" placeholder='Requests (Optional)' value = {inputs.bookerRequest} onChange={handleChangeInput}/>
          <button
            className="bg-black w-full p-3 font-bold rounded text-white disabled:bg-gray-400"
            disabled={disabled || loading}
            onClick={handleClick}>
              {loading ?
                <CircularProgress color="inherit"></CircularProgress>
                :
                "Create Reservation"
              }
          </button>
          <p className='m-4 text-sm'>
            By clicking “Complete reservation” you agree to the OpenTable Terms of Use and Privacy Policy. Standard text message rates may apply. You may opt out of receiving text messages at any time.
          </p>
        </>}
    </div>
  )
}
