import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import flightRoutes from './routes/flights.routes.js'
import bookingRoutes from './routes/booking.routes.js'

const app = express()

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000'

app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/flights', flightRoutes)
app.use('/api/bookings', bookingRoutes)

export default app
