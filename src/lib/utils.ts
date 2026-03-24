import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { Property } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format rent: 65000 → "6.5万円"
export function formatRent(rent: number): string {
  const man = rent / 10000
  return `${man % 1 === 0 ? man.toFixed(0) : man.toFixed(1)}万円`
}

// Format area: 25.5 → "25.5㎡"
export function formatArea(area: number): string {
  return `${area}㎡`
}

// Format building age: yearBuilt → "築X年"
export function formatBuildAge(yearBuilt: number): string {
  const age = new Date().getFullYear() - yearBuilt
  if (age <= 0) return "新築"
  return `築${age}年`
}

// Format walk minutes: 5 → "徒歩5分"
export function formatWalkMinutes(minutes: number): string {
  return `徒歩${minutes}分`
}

// Filter state type
export type FilterState = {
  areas: string[]          // area slugs
  rentMin: number          // min rent in yen
  rentMax: number          // max rent in yen
  layouts: string[]        // layout types like "1LDK"
  walkMinutes: number | null  // max walk minutes, null = no filter
  buildingTypes: string[]  // "マンション", "アパート"
  features: string[]       // required features
}

// Default filter state
export const defaultFilters: FilterState = {
  areas: [],
  rentMin: 0,
  rentMax: 200000,
  layouts: [],
  walkMinutes: null,
  buildingTypes: [],
  features: [],
}

// Apply filters to properties
export function filterProperties(properties: Property[], filters: FilterState): Property[] {
  return properties.filter((p) => {
    if (filters.areas.length > 0 && !filters.areas.includes(p.areaSlug)) return false
    if (p.rent < filters.rentMin || p.rent > filters.rentMax) return false
    if (filters.layouts.length > 0 && !filters.layouts.includes(p.layout)) return false
    if (filters.walkMinutes !== null && p.walkMinutes > filters.walkMinutes) return false
    if (filters.buildingTypes.length > 0 && !filters.buildingTypes.includes(p.buildingType)) return false
    if (filters.features.length > 0 && !filters.features.every((f) => p.features.includes(f))) return false
    return true
  })
}

// Sort key type
export type SortKey = "rent-asc" | "rent-desc" | "year-desc" | "walk-asc"

// Sort properties
export function sortProperties(properties: Property[], sortKey: SortKey): Property[] {
  const sorted = [...properties]
  switch (sortKey) {
    case "rent-asc":
      return sorted.sort((a, b) => a.rent - b.rent)
    case "rent-desc":
      return sorted.sort((a, b) => b.rent - a.rent)
    case "year-desc":
      return sorted.sort((a, b) => b.yearBuilt - a.yearBuilt)
    case "walk-asc":
      return sorted.sort((a, b) => a.walkMinutes - b.walkMinutes)
  }
}
