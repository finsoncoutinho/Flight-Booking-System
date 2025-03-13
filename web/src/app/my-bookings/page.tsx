'use client'

import { TBooking } from '@/types/TBookings'
import { getAuthToken } from '@/utils/helpers'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const MyBookings = () => {
  const [myBookings, setMyBookings] = useState<TBooking[]>()
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    ;(async function () {
      try {
        setIsLoading(true)
        const token = getAuthToken()
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/bookings/my-bookings`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        setMyBookings(response.data.bookings)
      } catch (error: any) {
        // console.error('Error fetching flight details:', error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  if (isLoading) {
    return (
      <div className='text-center text-gray-500'>
        <p>Loading...</p>
      </div>
    )
  }

  if (!myBookings?.length) {
    return (
      <div className='text-center text-gray-500'>
        <p>No bookings found.</p>
        <button
          onClick={() => router.push('/')}
          className='px-4 py-2  bg-red-500 hover:bg-red-600 text-white rounded-lg  transition'
        >
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className='max-w-4xl mx-auto p-6 text-black'>
      <h2 className='text-2xl font-bold mb-4'>My Bookings</h2>
      <div className='space-y-4'>
        {myBookings.map((booking) => (
          <div key={booking?._id} className='border rounded-lg p-4 shadow-lg'>
            <h3 className='text-lg font-semibold'>
              {booking?.flightId?.airline} ({booking?.flightId?.airlineCode}{' '}
              {booking?.flightId?.flightNumber})
            </h3>
            <p className='text-gray-600'>
              <strong>Route:</strong> {booking?.flightId?.origin} →{' '}
              {booking?.flightId?.destination}
            </p>
            <p className='text-gray-600'>
              <strong>Departure:</strong>{' '}
              {new Date(booking?.flightId?.departure).toLocaleString()}
            </p>
            <p className='text-gray-600'>
              <strong>Arrival:</strong>{' '}
              {new Date(booking?.flightId?.arrival).toLocaleString()}
            </p>
            <p className='text-gray-600'>
              <strong>Duration:</strong> {booking?.flightId?.duration}
            </p>
            <p className='text-gray-600'>
              <strong>Passenger:</strong> {booking?.fullName}
            </p>
            <p className='text-gray-600'>
              <strong>Phone:</strong> {booking?.phoneNumber}
            </p>
            <p className='text-gray-600'>
              <strong>Total Seats:</strong> {booking?.totalSeats}
            </p>
            <p className='text-gray-600'>
              <strong>Total Price:</strong> ₹{booking?.totalPrice}
            </p>
            <p className='text-gray-600'>
              <strong>Booking Date:</strong>{' '}
              {new Date(booking?.bookingDate).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className='flex justify-center mt-6'>
        <button
          onClick={() => router.push('/')}
          className='px-4 py-2  bg-red-500 hover:bg-red-600 text-white rounded-lg  transition'
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default MyBookings
