"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"

type CompareContextType = {
  compareIds: string[]
  addToCompare: (id: string) => boolean
  removeFromCompare: (id: string) => void
  isInCompare: (id: string) => boolean
  clearCompare: () => void
  isMaxReached: boolean
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

const STORAGE_KEY = "fukuoka-rooms-compare"
const MAX_COMPARE = 3

function loadFromStorage(): string[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveToStorage(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>(loadFromStorage)

  const addToCompare = (id: string): boolean => {
    if (compareIds.length >= MAX_COMPARE || compareIds.includes(id)) return false
    setCompareIds((prev) => {
      const next = [...prev, id]
      saveToStorage(next)
      return next
    })
    return true
  }

  const removeFromCompare = useCallback((id: string) => {
    setCompareIds((prev) => {
      const next = prev.filter((c) => c !== id)
      saveToStorage(next)
      return next
    })
  }, [])

  const isInCompare = (id: string) => compareIds.includes(id)

  const clearCompare = useCallback(() => {
    setCompareIds([])
    saveToStorage([])
  }, [])

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
