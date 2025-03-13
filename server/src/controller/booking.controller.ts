import { Request, Response } from 'express'

import { Booking } from '../models/booking.model.js'
import { Flight } from '../models/flight.model.js'

interface AuthRequest extends Request {
  user?: { userId: string } // Extend Express Request to include `user`
}

export const bookFlight = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { flightId, totalSeats, fullName, phoneNumber } = req.body
    const userId = req?.user?.userId

    if (!userId || !flightId || !totalSeats || !fullName || !phoneNumber) {
      res.status(400).json({ error: 'All fields are required' })
      return
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      res.status(400).json({ error: 'Phone number must be exactly 10 digits' })
      return
    }

    if (totalSeats < 1) {
      res.status(400).json({ error: 'Total seats must be at least 1' })
      return
    }

    const flight = await Flight.findById(flightId)
    if (!flight) {
      res.status(404).json({ error: 'Flight not found' })
      return
    }

    if (flight.availableSeats < totalSeats) {
      res.status(400).json({ error: 'Not enough available seats' })
      return
    }

    const totalPrice = totalSeats * flight.price

    const newBooking = new Booking({
      userId,
      flightId,
      totalSeats,
      totalPrice,
      fullName,
      phoneNumber,
    })

    await newBooking.save()

    flight.availableSeats -= totalSeats
    await flight.save()

    res.status(201).json({
      message: 'Flight booked successfully!',
      bookingDetails: newBooking,
    })
  } catch (error: any) {
    res.status(500).json({ error: 'Server error: ' + error.message })
    return
  }
}

export const getUserBookings = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req?.user?.userId

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized: User not found' })
      return
    }

    const bookings = await Booking.find({ userId }).populate('flightId')

    res.status(200).json({ bookings })
  } catch (error: any) {
    res.status(500).json({ error: 'Server error: ' + error.message })
  }
}
