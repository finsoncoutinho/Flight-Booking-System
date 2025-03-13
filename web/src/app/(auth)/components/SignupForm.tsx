/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { TSignup } from '@/types/TAuth'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TSignup>()
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (data: TSignup) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        data
      )

      router.push('/login')
    } catch (error: any) {
      setErrorMessage(error.response?.data.error)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 text-black'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-96'>
        <h2 className='text-2xl font-semibold text-center mb-4'>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <input
              {...register('username', { required: 'Username is required' })}
              className='w-full p-2 border rounded'
              placeholder='Username'
            />
            <p className='text-red-500 text-sm'>{errors.username?.message}</p>
          </div>
          <div>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              type='password'
              className='w-full p-2 border rounded'
              placeholder='Password'
            />
            <p className='text-red-500 text-sm'>{errors.password?.message}</p>
          </div>
          <div>
            <input
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) =>
                  value === watch('password') || 'Passwords do not match',
              })}
              type='password'
              className='w-full p-2 border rounded'
              placeholder='Confirm Password'
            />
            <p className='text-red-500 text-sm'>
              {errors.confirmPassword?.message}
            </p>
          </div>
          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-blue-600 text-white p-2 rounded'
          >
            {isSubmitting ? 'Loading...' : 'Sign Up'}
          </button>
        </form>

        {errorMessage && (
          <div className='text-sm text-red-400 py-2'>{errorMessage}</div>
        )}
      </div>
    </div>
  )
}

export default SignupForm
