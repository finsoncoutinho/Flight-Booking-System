import { Request, Response } from 'express'
import { Flight } from '../models/flight.model'
import mongoose from 'mongoose'

export const searchFlights = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const origin =
      typeof req.query.origin === 'string' ? req.query.origin : undefined
    const destination =
      typeof req.query.destination === 'string'
        ? req.query.destination
        : undefined
    const departureDate =
      typeof req.query.departureDate === 'string'
        ? req.query.departureDate
        : undefined
    const passengers =
      typeof req.query.passengers === 'string'
        ? req.query.passengers
        : undefined

    const searchFilter: any = {}

    if (origin) {
      searchFilter.origin = { $regex: new RegExp(origin, 'i') }
    }
    if (destination) {
      searchFilter.destination = { $regex: new RegExp(destination, 'i') }
    }
    if (departureDate && !isNaN(Date.parse(departureDate))) {
      searchFilter.departure = { $gte: new Date(departureDate) }
    }
    if (passengers) {
      const numPassengers = parseInt(passengers, 10)
      if (!isNaN(numPassengers) && numPassengers > 0) {
        searchFilter.availableSeats = { $gte: numPassengers }
      }
    }

    const flights = await Flight.find(searchFilter).sort({ departure: 1 })

    res.json(flights)
    return
  } catch (error: any) {
    res.status(500).json({ error: 'Server error: ' + error.message })
    return
  }
}

export const getFlightById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid Flight ID format' })
      return
    }

    const flight = await Flight.findById(id)

    if (!flight) {
      res.status(404).json({ error: 'Flight not found' })
      return
    }

    res.json(flight)
  } catch (error: any) {
    res.status(500).json({ error: 'Server error: ' + error.message })
  }
}
