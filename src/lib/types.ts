export type Property = {
  id: string
  title: string
  rent: number           // monthly rent in yen
  managementFee: number  // management fee in yen
  deposit: number        // months of deposit
  keyMoney: number       // months of key money
  layout: string         // "1LDK", "2DK" etc
  area: number           // floor area in sqm
  floor: number          // floor number
  totalFloors: number    // building total floors
  buildingType: string   // "マンション", "アパート"
  yearBuilt: number      // year built
  address: string        // full address
  nearestStation: string // nearest station name
  walkMinutes: number    // walking minutes from station
  areaSlug: string       // "tenjin", "hakata" etc
  images: string[]       // image paths
  features: string[]     // "オートロック", "バストイレ別" etc
  source: string         // "SUUMO", "homes.co.jp" (future use)
}

export type Area = {
  slug: string
  name: string
  description: string
  image: string
  highlights: string[]
  avgRent: number        // average rent for reference
}
