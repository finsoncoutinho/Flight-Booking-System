'use client'

import { TFlight } from '@/types/TFlight'
import React from 'react'
import FlightItem from './FlightItem'
import BookingForm from './BookingForm'
import { useRouter } from 'next/navigation'
type Props = {
  flight: TFlight
}
const BookFlight: React.FC<Props> = ({ flight }) => {
  const router = useRouter()

  return (
    <>
      <button
        onClick={() => router.push('/')}
        className='px-4 py-2 m-4 bg-red-500 hover:bg-red-600 text-white rounded-lg  transition'
      >
        Back to Home
      </button>
      <div className='flex flex-col justify-center items-center  p-'>
        <FlightItem flight={flight} showBookingBtn={false} />
        <BookingForm flight={flight} />
      </div>
    </>
  )
}

export default BookFlight
