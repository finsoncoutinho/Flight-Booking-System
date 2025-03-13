import express from 'express'
import { bookFlight, getUserBookings } from '../controller/booking.controller'
import { authenticateUser } from '../middleware/auth.middleware'

const router = express.Router()

router.post('/book', authenticateUser, bookFlight)
router.get('/my-bookings', authenticateUser, getUserBookings)

export default router
