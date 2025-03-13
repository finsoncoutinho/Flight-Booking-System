import express from 'express'
import { getFlightById, searchFlights } from '../controller/flight.controller'

const router = express.Router()

router.get('/search', searchFlights)
router.get('/:id', getFlightById)

export default router
