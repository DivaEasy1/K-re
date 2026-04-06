export interface Station {
  id: string
  name: string
  location: string
  lat: number
  lng: number
  status: 'open' | 'coming_soon'
  openYear: number
  description: string
  image: string
  bookingUrl?: string
  equipment: string[]
}

export interface Activity {
  id: string
  title: string
  description: string
  duration: string
  difficulty: 'easy' | 'medium' | 'hard'
  price: string
  image: string
  icon: string
  category: string
}

export interface Settings {
  siteName: string
  tagline: string
  contact: {
    address: string
    city: string
    phone: string
    email: string
  }
  social: {
    facebook: string
    instagram: string
  }
  bookingUrl: string
  kayakomatStats: {
    countries: number
    stations: number
    stationsFrance: number
    paddlers: number
  }
}
