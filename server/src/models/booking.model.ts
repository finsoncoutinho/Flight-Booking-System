import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flight',
      required: true,
    },
    totalSeats: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now },
    fullName: { type: String, required: true },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'],
    },
  },
  { timestamps: true }
)

export const Booking = mongoose.model('Booking', bookingSchema)
