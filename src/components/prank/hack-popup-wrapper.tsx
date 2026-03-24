"use client"

import dynamic from "next/dynamic"

const HackPopup = dynamic(
  () => import("./hack-popup").then((m) => ({ default: m.HackPopup })),
  { ssr: false }
)

export function HackPopupWrapper() {
  return <HackPopup />
}
