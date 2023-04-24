'use client'
import Image from "next/image"
import errorMascot from '../../public/icons/icons/error.png'

const NotFound= ({
    error
}: {
    error: Error
}) => {
  return (
    <div className="bg-h-screen bg-gray-200 flex flex-col justify-center items-center">
        <Image src={errorMascot} alt='error'></Image>
        <div className="bg-white px-9 py-14 shadow rounded">
            <h3 className="text-3xl font-bold">Well, this is embarrassing</h3>
            <p className="text-teg font-bold">We couldn't find that restaurant</p>
            <p className="mt-6 text-sm font-light">Error Code: 400</p>
        </div>
    </div>
  )
}

export default NotFound