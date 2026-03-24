"use client"

import { useState, useEffect, useRef } from "react"

const fakeIPs = ["192.168.1.47", "10.0.0.134", "172.16.254.1"]
const fakeMacs = ["A4:83:E7:2F:9B:01", "D8:BB:C1:4E:7A:F3"]

const scanLines = [
  "$ sudo nmap -sS -O target_device...",
  "[*] Scanning ports 1-65535...",
  "[+] Port 22 (SSH) - OPEN",
  "[+] Port 443 (HTTPS) - OPEN",
  "[+] Port 3306 (MySQL) - OPEN",
  "[*] OS Detection: running...",
  "[+] Device fingerprint acquired",
  "[*] Extracting browser cookies...",
  "[+] Session tokens captured: 47 entries",
  "[*] Accessing local storage...",
  "[+] Stored passwords found: 12 entries",
  "[*] Camera access... GRANTED",
  "[*] Microphone access... GRANTED",
  "[*] GPS location acquired",
  "[+] Photo library: 2,847 images indexed",
  "[+] Contact list: 234 entries exported",
  "[*] Encrypting extracted data...",
  "[+] Data exfiltration complete",
  "[!] FULL DEVICE ACCESS ACHIEVED",
]

export function HackPopup() {
  const [phase, setPhase] = useState<"loading" | "scanning" | "complete" | "dismissed">("loading")
  const [lines, setLines] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [glitch, setGlitch] = useState(false)
  const [deviceInfo, setDeviceInfo] = useState("Unknown Device")
  const [fakeIP, setFakeIP] = useState(fakeIPs[0])
  const terminalRef = useRef<HTMLDivElement>(null)

  // Get device info on client only
  useEffect(() => {
    setDeviceInfo(navigator?.userAgent?.slice(0, 40) || "Unknown Device")
    setFakeIP(fakeIPs[Math.floor(Math.random() * fakeIPs.length)])
  }, [])

  // Phase 1: Loading screen
  useEffect(() => {
    const timer = setTimeout(() => setPhase("scanning"), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Phase 2: Terminal scan
  useEffect(() => {
    if (phase !== "scanning") return
    let i = 0
    const interval = setInterval(() => {
      if (i < scanLines.length) {
        setLines((prev) => [...prev, scanLines[i]])
        setProgress(Math.round(((i + 1) / scanLines.length) * 100))
        i++
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setGlitch(true)
          setTimeout(() => setPhase("complete"), 500)
        }, 800)
      }
    }, 400)
    return () => clearInterval(interval)
  }, [phase])

  // Glitch effect
  useEffect(() => {
    if (!glitch) return
    const timer = setTimeout(() => setGlitch(false), 500)
    return () => clearTimeout(timer)
  }, [glitch])

  if (phase === "dismissed") return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
    >
      {/* Scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[10000] opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.1) 2px, rgba(0,255,0,0.1) 4px)",
        }}
      />

      {/* Glitch effect */}
      {glitch && (
        <div className="fixed inset-0 z-[10001] pointer-events-none">
          <div className="absolute inset-0 bg-red-500/20 animate-pulse" />
          <div className="absolute top-1/3 left-0 right-0 h-2 bg-white/30 translate-x-4" />
          <div className="absolute top-2/3 left-0 right-0 h-1 bg-cyan-400/40 -translate-x-8" />
        </div>
      )}

      <div className="w-full max-w-lg mx-4 relative">
        {/* Phase 1: Loading */}
        {phase === "loading" && (
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-2 border-red-500/30 rounded-full animate-ping" />
              <div className="absolute inset-2 border-2 border-red-500/50 rounded-full animate-spin" style={{ animationDuration: "2s" }} />
              <div className="absolute inset-4 border-2 border-t-red-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDuration: "0.8s" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-red-500 text-2xl">⚠</span>
              </div>
            </div>
            <p className="text-red-500 text-sm font-mono animate-pulse">
              ESTABLISHING CONNECTION...
            </p>
            <p className="text-red-500/50 text-xs font-mono mt-2">
              Bypassing firewall... {fakeIPs[0]}
            </p>
          </div>
        )}

        {/* Phase 2: Scanning terminal */}
        {phase === "scanning" && (
          <div className="rounded-lg overflow-hidden border border-red-500/30 shadow-2xl shadow-red-500/10">
            {/* Terminal header */}
            <div className="bg-red-950/80 px-4 py-2 flex items-center gap-2 border-b border-red-500/20">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/40" />
              <span className="text-red-400/70 text-xs font-mono ml-2">root@remote — /exploit</span>
            </div>

            {/* Terminal body */}
            <div
              ref={terminalRef}
              className="bg-black/90 p-4 h-64 overflow-y-auto font-mono text-sm"
              style={{ scrollbarWidth: "none" }}
            >
              <p className="text-red-400/60 text-xs mb-2">
                [TARGET] Device: {deviceInfo}...
              </p>
              <p className="text-red-400/60 text-xs mb-3">
                [TARGET] IP: {fakeIP} | MAC: {fakeMacs[0]}
              </p>
              {lines.map((line, i) => (
                <p
                  key={i}
                  className={`text-xs leading-relaxed ${
                    line.startsWith("[!]")
                      ? "text-red-400 font-bold"
                      : line.startsWith("[+]")
                        ? "text-green-400"
                        : line.startsWith("[*]")
                          ? "text-cyan-400/80"
                          : "text-green-300/60"
                  }`}
                >
                  {line}
                </p>
              ))}
              <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1" />
            </div>

            {/* Progress bar */}
            <div className="bg-black/90 px-4 pb-3 border-t border-red-500/10">
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-red-400">EXTRACTION PROGRESS</span>
                <span className="text-red-400">{progress}%</span>
              </div>
              <div className="h-1.5 bg-red-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Complete */}
        {phase === "complete" && (
          <div className="text-center space-y-6">
            {/* Warning icon */}
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-red-500 font-mono tracking-wide">
                SECURITY BREACH DETECTED
              </h1>
              <div className="h-0.5 w-32 mx-auto mt-3 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            </div>

            {/* Message */}
            <div className="bg-red-950/30 border border-red-500/20 rounded-lg p-5 text-left space-y-3">
              <p className="text-white text-base font-bold text-center">
                あなたの全ての端末情報を<br />ハッキングしました
              </p>
              <div className="text-red-300/70 text-xs font-mono space-y-1 pt-2 border-t border-red-500/10">
                <p>• ブラウザ履歴・保存パスワード: <span className="text-green-400">取得済み</span></p>
                <p>• 写真・連絡先データ: <span className="text-green-400">取得済み</span></p>
                <p>• カメラ・マイク: <span className="text-green-400">アクセス中</span></p>
                <p>• GPS位置情報: <span className="text-green-400">追跡中</span></p>
                <p>• SNSアカウント: <span className="text-green-400">侵入済み</span></p>
              </div>
            </div>

            {/* Fake timer */}
            <div className="text-red-400/60 text-xs font-mono">
              データ公開まで残り: <span className="text-red-400 font-bold">23:59:47</span>
            </div>

            {/* Dismiss (tiny, hard to notice at first) */}
            <button
              onClick={() => setPhase("dismissed")}
              className="text-white/10 hover:text-white/60 text-[10px] transition-colors duration-500 mt-8"
            >
              ※ これはジョークです。タップして閉じる
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
