"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type CompareContextType = {
  compareIds: string[]
  addToCompare: (id: string) => boolean // returns false if already at max
  removeFromCompare: (id: string) => void
  isInCompare: (id: string) => boolean
  clearCompare: () => void
  isMaxReached: boolean
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

const STORAGE_KEY = "fukuoka-rooms-compare"
const MAX_COMPARE = 3

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setCompareIds(JSON.parse(stored))
      } catch {}
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compareIds))
    }
  }, [compareIds, loaded])

  const addToCompare = (id: string): boolean => {
    if (compareIds.length >= MAX_COMPARE || compareIds.includes(id)) return false
    setCompareIds((prev) => [...prev, id])
    return true
  }

  const removeFromCompare = (id: string) => {
    setCompareIds((prev) => prev.filter((c) => c !== id))
  }

  const isInCompare = (id: string) => compareIds.includes(id)

  const clearCompare = () => setCompareIds([])

  const isMaxReached = compareIds.length >= MAX_COMPARE

  return (
    <CompareContext.Provider
      value={{ compareIds, addToCompare, removeFromCompare, isInCompare, clearCompare, isMaxReached }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (!context) throw new Error("useCompare must be used within CompareProvider")
  return context
}
