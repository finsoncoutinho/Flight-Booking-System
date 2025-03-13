import mongoose from 'mongoose'

const flightSchema = new mongoose.Schema(
  {
    airline: { type: String, required: true },
    airlineCode: { type: String, required: true, uppercase: true },
    flightNumber: { type: Number, required: true, min: 1 },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    availableSeats: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    departure: { type: Date, required: true },
    arrival: { type: Date, required: true },
    duration: { type: String, required: true },
    operationalDays: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
)

export const Flight = mongoose.model('Flight', flightSchema)
