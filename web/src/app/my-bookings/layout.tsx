'use client'

import AuthProvider from '../components/AuthProvider'

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AuthProvider>{children}</AuthProvider>
}
