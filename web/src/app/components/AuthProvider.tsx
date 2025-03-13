'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { getAuthToken, removeAuthToken } from '@/utils/helpers'

export default function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyToken = async () => {
      const token = getAuthToken()

      if (!token) {
        router.replace('/login')
        return
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/check-auth`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        if (response.status === 200) {
          setIsAuthenticated(true)
        } else {
          removeAuthToken()
          router.replace('/login')
        }
      } catch (error) {
        removeAuthToken()
        router.replace('/login')
      } finally {
        setLoading(false)
      }
    }

    verifyToken()
  }, [router])

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p>Loading...</p>
      </div>
    )
  }

  return isAuthenticated ? <>{children}</> : null
}
