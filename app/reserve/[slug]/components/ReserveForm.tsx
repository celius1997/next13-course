"use client"
import { useState, useEffect} from "react"

export default function ReserveForm() {
  const [inputs, setInputs] = useState({
      bookerEmail: "",
      bookerPhone: "",
      bookerFirstName: "",
      bookerLastName: "",
      bookerOcasion: "",
      bookerRequest: ""
  })
  const [disabled, setDisabled] = useState(true)

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
        <input type="text" name = "bookerLastName" className="border rounded p-3 w-80 mb-4" placeholder='Last Name' value = {inputs.bookerLastName} onChange={handleChangeInput}/>
        <input type="text" name = "bookerPhone" className="border rounded p-3 w-80 mb-4" placeholder='Phone Number' value = {inputs.bookerPhone} onChange={handleChangeInput}/>
        <input type="text" name = "bookerEmail" className="border rounded p-3 w-80 mb-4" placeholder='Email' value = {inputs.bookerEmail} onChange={handleChangeInput}/>
        <input type="text" name = "bookerOcasion" className="border rounded p-3 w-80 mb-4" placeholder='Ocassion (Optional)' value = {inputs.bookerOcasion} onChange={handleChangeInput}/>
        <input type="text" name = "bookerRequest" className="border rounded p-3 w-80 mb-4" placeholder='Requests (Optional)' value = {inputs.bookerRequest} onChange={handleChangeInput}/>
        <button
          className="bg-black w-full p-3 font-bold rounded text-white disabled:bg-gray-400"
          disabled={disabled}>
            Complete reservation
        </button>
        <p className='m-4 text-sm'>
          By clicking “Complete reservation” you agree to the OpenTable Terms of Use and Privacy Policy. Standard text message rates may apply. You may opt out of receiving text messages at any time.
        </p>
    </div>
  )
}
