import { TFlight } from './TFlight'

export type TBooking = {
  _id: string | null
  userId: string | null
  flightId: TFlight
  totalSeats: number | null
  totalPrice: number | null
  fullName: string | null
  phoneNumber: string | null
  bookingDate: string | null
  __v: number | null
}

export type BookingFormInputs = {
  flightId: string
  totalSeats: number
  fullName: string
  phoneNumber: string
}
