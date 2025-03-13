import { TFlight } from '@/types/TFlight'
import axios from 'axios'
import React from 'react'
import BookFlight from '../components/BookFlight'
import Link from 'next/link'

const getFlightById = async (id: number) => {
  try {
    const response = await axios.get<TFlight>(
      `${process.env.NEXT_PUBLIC_API_URL}/flights/${id}`
    )
    return response.data
  } catch (error: any) {
    // console.error('Error fetching flight details:', error)
    return null
  }
}

const page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params

  const flight = await getFlightById(id)

  if (!flight) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <h2 className='text-xl font-bold text-red-500'>Flight Not Found</h2>
        <p className='text-gray-600 mt-2'>
          The flight you are looking for does not exist or has been removed.
        </p>
        <Link
          href='/'
          className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-2'
        >
          Back to Home
        </Link>
      </div>
    )
  }
  return <BookFlight flight={flight!} />
}

export default page
