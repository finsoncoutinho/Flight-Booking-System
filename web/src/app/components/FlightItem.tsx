import React from 'react'
import { TFlight } from '@/types/TFlight'
import Link from 'next/link'

type Props = {
  flight: TFlight
  showBookingBtn?: boolean
}

const FlightItem: React.FC<Props> = ({ flight, showBookingBtn = true }) => {
  return (
    <div className='flex justify-between items-center border p-4 rounded-lg shadow-md bg-white w-full max-w-2xl'>
      <div>
        <h3 className='text-lg font-bold text-gray-900'>
          Rs {flight.price?.toLocaleString()}.00
        </h3>

        <p className='text-sm text-gray-600 font-medium'>{flight.airline}</p>

        <div className='mt-2'>
          <p className='text-sm text-gray-600'>
            {flight.airlineCode}-{flight.flightNumber}
          </p>
          <p className='text-lg font-semibold text-gray-600'>
            {flight.origin} → {flight.destination}
          </p>
          <p className='text-sm text-gray-600'>
            Depart:{' '}
            {new Date(flight.departure!).toLocaleString([], {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </p>
          <p className='text-sm text-gray-600'>
            Arrive:{' '}
            {new Date(flight.arrival!).toLocaleString([], {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </p>

          <p className='text-sm text-gray-600'>Duration: {flight.duration}</p>

          <p className='text-sm text-gray-600'>
            Seats Available: {flight.availableSeats}
          </p>
        </div>
      </div>

      {showBookingBtn && (
        <Link
          href={`${flight?._id}`}
          className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
        >
          BOOK THIS FLIGHT
        </Link>
      )}
    </div>
  )
}

export default FlightItem
