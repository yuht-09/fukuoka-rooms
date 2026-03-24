"use client"

import { useState, useEffect, useRef, useCallback } from "react"

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
  const [phase, setPhase] = useState(0) // 0=loading, 1=scanning, 2=complete, 3=dismissed
  const [lines, setLines] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Phase 0 -> 1
  useEffect(() => {
    if (!mounted || phase !== 0) return
    const t = setTimeout(() => setPhase(1), 2000)
    return () => clearTimeout(t)
  }, [mounted, phase])

  // Phase 1: scanning
  useEffect(() => {
    if (!mounted || phase !== 1) return
    let idx = 0
    const iv = setInterval(() => {
      if (idx < scanLines.length) {
        const line = scanLines[idx]
        setLines((prev) => [...prev, line])
        setProgress(Math.round(((idx + 1) / scanLines.length) * 100))
        idx++
        terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight)
      } else {
        clearInterval(iv)
        setTimeout(() => setPhase(2), 1000)
      }
    }, 400)
    return () => clearInterval(iv)
  }, [mounted, phase])

  const dismiss = useCallback(() => setPhase(3), [])

  if (!mounted || phase === 3) return null

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.96)",
        fontFamily: "monospace",
      }}
    >
      {/* Scanlines */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 100000,
          opacity: 0.03,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.15) 2px, rgba(0,255,0,0.15) 4px)",
        }}
      />

      <div style={{ width: "100%", maxWidth: 480, margin: "0 16px" }}>
        {/* Phase 0: Loading */}
        {phase === 0 && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 64,
                height: 64,
                margin: "0 auto 24px",
                border: "2px solid rgba(239,68,68,0.5)",
                borderTopColor: "#ef4444",
                borderRadius: "50%",
                animation: "hack-spin 0.8s linear infinite",
              }}
            />
            <p style={{ color: "#ef4444", fontSize: 14, animation: "hack-pulse 1.5s ease-in-out infinite" }}>
              ESTABLISHING CONNECTION...
            </p>
            <p style={{ color: "rgba(239,68,68,0.4)", fontSize: 11, marginTop: 8 }}>
              Bypassing firewall... 192.168.1.47
            </p>
          </div>
        )}

        {/* Phase 1: Terminal */}
        {phase === 1 && (
          <div
            style={{
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid rgba(239,68,68,0.3)",
              boxShadow: "0 0 40px rgba(239,68,68,0.1)",
            }}
          >
            {/* Terminal header */}
            <div
              style={{
                background: "rgba(80,0,0,0.8)",
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                borderBottom: "1px solid rgba(239,68,68,0.2)",
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444", animation: "hack-pulse 1.5s ease-in-out infinite" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(234,179,8,0.5)" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(34,197,94,0.4)" }} />
              <span style={{ color: "rgba(248,113,113,0.6)", fontSize: 11, marginLeft: 8 }}>
                root@remote — /exploit
              </span>
            </div>

            {/* Terminal body */}
            <div
              ref={terminalRef}
              style={{
                background: "rgba(0,0,0,0.9)",
                padding: 16,
                height: 256,
                overflowY: "auto",
                fontSize: 12,
              }}
            >
              <p style={{ color: "rgba(248,113,113,0.5)", fontSize: 11, marginBottom: 12 }}>
                [TARGET] Device: Mobile/Desktop Browser
              </p>
              {lines.map((line, i) => (
                <p
                  key={i}
                  style={{
                    lineHeight: 1.8,
                    color: line.startsWith("[!]")
                      ? "#f87171"
                      : line.startsWith("[+]")
                        ? "#4ade80"
                        : line.startsWith("[*]")
                          ? "rgba(103,194,232,0.7)"
                          : "rgba(134,239,172,0.5)",
                    fontWeight: line.startsWith("[!]") ? "bold" : "normal",
                  }}
                >
                  {line}
                </p>
              ))}
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 16,
                  background: "#4ade80",
                  animation: "hack-pulse 1s ease-in-out infinite",
                  marginLeft: 4,
                }}
              />
            </div>

            {/* Progress */}
            <div style={{ background: "rgba(0,0,0,0.9)", padding: "0 16px 12px", borderTop: "1px solid rgba(239,68,68,0.1)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                <span style={{ color: "#f87171" }}>EXTRACTION PROGRESS</span>
                <span style={{ color: "#f87171" }}>{progress}%</span>
              </div>
              <div style={{ height: 6, background: "rgba(80,0,0,0.5)", borderRadius: 4, overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    background: "linear-gradient(to right, #dc2626, #f87171)",
                    borderRadius: 4,
                    transition: "width 0.3s",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Complete */}
        {phase === 2 && (
          <div style={{ textAlign: "center" }}>
            {/* Warning triangle */}
            <div style={{ marginBottom: 24 }}>
              <svg
                viewBox="0 0 24 24"
                style={{ width: 64, height: 64, margin: "0 auto", color: "#ef4444" }}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: 22, fontWeight: "bold", color: "#ef4444", letterSpacing: 2, marginBottom: 4 }}>
              SECURITY BREACH DETECTED
            </h1>
            <div style={{ width: 120, height: 2, margin: "12px auto 24px", background: "linear-gradient(to right, transparent, #ef4444, transparent)" }} />

            {/* Message box */}
            <div
              style={{
                background: "rgba(80,0,0,0.25)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: 8,
                padding: 20,
                textAlign: "left",
              }}
            >
              <p style={{ color: "white", fontSize: 16, fontWeight: "bold", textAlign: "center", marginBottom: 16, lineHeight: 1.6 }}>
                あなたの全ての端末情報を<br />ハッキングしました
              </p>
              <div style={{ borderTop: "1px solid rgba(239,68,68,0.1)", paddingTop: 12 }}>
                {[
                  "ブラウザ履歴・保存パスワード",
                  "写真・連絡先データ",
                  "カメラ・マイク",
                  "GPS位置情報",
                  "SNSアカウント",
                ].map((item, i) => (
                  <p key={i} style={{ color: "rgba(252,165,165,0.6)", fontSize: 11, lineHeight: 2 }}>
                    {"• "}{item}:{" "}
                    <span style={{ color: "#4ade80" }}>
                      {i < 2 ? "取得済み" : i < 4 ? "アクセス中" : "侵入済み"}
                    </span>
                  </p>
                ))}
              </div>
            </div>

            {/* Fake timer */}
            <p style={{ color: "rgba(248,113,113,0.5)", fontSize: 11, marginTop: 20 }}>
              データ公開まで残り: <span style={{ color: "#f87171", fontWeight: "bold" }}>23:59:47</span>
            </p>

            {/* Dismiss */}
            <button
              onClick={dismiss}
              style={{
                marginTop: 32,
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.08)",
                fontSize: 9,
                cursor: "pointer",
                padding: 8,
              }}
            >
              ※ これはジョークです。タップして閉じる
            </button>
          </div>
        )}
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes hack-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes hack-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}
