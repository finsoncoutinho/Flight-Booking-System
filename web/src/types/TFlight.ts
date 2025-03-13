export type TFlight = {
  _id: string | null
  airline: string | null
  airlineCode: string | null
  flightNumber: number | null
  origin: string | null
  destination: string | null
  availableSeats: number | null
  price: number | null
  departure: string | null
  arrival: string | null
  duration: string | null
  operationalDays: number[] | null
  __v: number | null
}

export type TFlightSearch = {
  origin: string
  destination: string
  departureDate: string
  passengers: number
}
