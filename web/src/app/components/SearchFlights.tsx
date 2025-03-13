'use client'
import { TFlight, TFlightSearch } from '@/types/TFlight'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import FlightItem from './FlightItem'
import Link from 'next/link'

const SearchFlights = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TFlightSearch>()
  const [flights, setFlights] = useState<TFlight[]>([])

  const getFlights = async (data: TFlightSearch) => {
    try {
      const query = new URLSearchParams(data as any).toString()
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/flights/search?${query}`
      )

      setFlights(response?.data)
    } catch (error) {
      console.error('Error fetching flights:', error)
    }
  }

  const onSubmit = async (data: TFlightSearch) => {
    await getFlights(data)
  }

  useEffect(() => {
    ;(async function () {
      await getFlights({
        origin: '',
        destination: '',
        departureDate: '',
        passengers: 1,
      })
    })()
  }, [])

  return (
    <div className='flex gap-24 min-h-screen text-black'>
      <div className='bg-gray-800 p-6  shadow-lg w-80 left-0  h-full fixed'>
        <Link
          href='my-bookings'
          className='w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded'
        >
          My Bookings
        </Link>
        <h2 className='text-xl font-semibold mb-4 mt-10 text-white'>
          Flight Search
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4 text-white'
        >
          <input
            {...register('origin')}
            placeholder='Enter Origin'
            className='w-full p-2 rounded bg-gray-700 border border-gray-600'
          />
          <input
            {...register('destination')}
            placeholder='Enter Destination'
            className='w-full p-2 rounded bg-gray-700 border border-gray-600'
          />
          <input
            {...register('departureDate')}
            type='date'
            className='w-full p-2 rounded bg-gray-700 border border-gray-600'
          />
          <input
            {...register('passengers')}
            type='number'
            placeholder='Passengers'
            min='1'
            className='w-full p-2 rounded bg-gray-700 border border-gray-600'
          />
          <button
            type='submit'
            className='w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded'
          >
            {isSubmitting ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>
      <div className='ml-96 flex-1 p-6'>
        {flights.length > 0 ? (
          <div className='mt-6 text-black flex flex-col gap-4'>
            <h3 className='text-lg font-semibold mb-2'>Available Flights</h3>
            {flights.map((flight) => (
              <FlightItem flight={flight} key={flight._id} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center min-h-screen'>
            <h2 className='text-xl font-bold text-red-500'>Flight Not Found</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchFlights
