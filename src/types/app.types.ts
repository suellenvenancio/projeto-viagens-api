export interface Flight {
  airline: string
  flightNumber: string
  destination: string
  departureDate: Date
  arrivalDate: Date
  price: number
  userId: string
}

export interface Hotel {
  name: string
  address: string
  checkIn: Date
  checkOut: Date
  pricePerNight: number
  userId: string
}

export interface Attraction {
  name: string
  city: string
  price: number
  userId: string
  visitDate: Date
}
