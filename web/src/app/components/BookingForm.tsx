'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { TFlight } from '@/types/TFlight'
import { getAuthToken } from '@/utils/helpers'
import { BookingFormInputs } from '@/types/TBookings'
import { useRouter } from 'next/navigation'

type Props = {
  flight: TFlight
}

const BookingForm: React.FC<Props> = ({ flight }) => {
  const [totalAmount, setTotalAmount] = useState(flight.price)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormInputs>({
    defaultValues: {
      flightId: flight._id!,
      totalSeats: 1,
      fullName: '',
      phoneNumber: '',
    },
  })

  const totalSeats = watch('totalSeats')

  const onSubmit = async (data: BookingFormInputs) => {
    try {
      const token = getAuthToken()
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/book`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      alert('Booking successful!')
      router.push('/')
    } catch (error) {
      //   console.error('Booking failed:', error)
      alert('Booking failed. Please try again.')
    }
  }

  return (
    <div className='max-w-lg w-full mx-auto mt-10 p-6 bg-white shadow-md rounded-lg'>
      <h2 className='text-2xl font-bold text-gray-900 mb-4'>
        Book Your Flight
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 text-black'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Full Name
          </label>
          <input
            {...register('fullName', { required: 'Full name is required' })}
            className='w-full p-2 border rounded-lg'
            placeholder='Enter your full name'
          />
          {errors?.fullName && (
            <p className='text-red-500 text-sm'>{errors?.fullName?.message}</p>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Phone Number
          </label>
          <input
            {...register('phoneNumber', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Enter a valid 10-digit phone number',
              },
            })}
            className='w-full p-2 border rounded-lg'
            placeholder='Enter your phone number'
          />
          {errors?.phoneNumber && (
            <p className='text-red-500 text-sm'>
              {errors?.phoneNumber?.message}
            </p>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Total Seats
          </label>
          <input
            type='number'
            {...register('totalSeats', {
              required: 'Please enter number of seats',
              min: { value: 1, message: 'At least 1 seat required' },
            })}
            className='w-full p-2 border rounded-lg'
            placeholder='Enter total seats'
            onChange={(e) =>
              setTotalAmount(parseInt(e.target.value) * flight?.price)
            }
          />
          {errors?.totalSeats && (
            <p className='text-red-500 text-sm'>
              {errors?.totalSeats?.message}
            </p>
          )}
        </div>

        <div className='text-lg font-semibold'>
          Total Amount: <span className='text-gray-900'>Rs {totalAmount}</span>
        </div>

        <button
          type='submit'
          className='p-2 w-full bg-red-500 hover:bg-red-600 text-white rounded-lg  transition'
        >
          Book Now
        </button>
      </form>
    </div>
  )
}

export default BookingForm
