'use client'

import { useState, useRef, useEffect } from 'react'
import Draggable from 'react-draggable'
import { motion, AnimatePresence } from 'framer-motion'
import { WalletPill } from "@/components/wallet-pill"
import { ExpandWalletView } from "@/components/expand-wallet-view"
import { FlyingHearts } from "@/components/FlyingHearts"
import { ThemeToggle } from "@/components/ThemeToggle"

// Function to generate a random balance between 100 and 10000
const generateRandomBalance = () => {
  return (Math.random() * 9900 + 100).toFixed(2)
}

export default function Page() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [showHearts, setShowHearts] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [balance, setBalance] = useState("0.00")
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const pillRef = useRef(null)

  const [expandedPosition, setExpandedPosition] = useState('bottom')

  useEffect(() => {
    setBalance(generateRandomBalance())
  }, [])

  const handlePillClick = (e: React.MouseEvent) => {
    setIsExpanded(!isExpanded)
    setShowHearts(true)
    setMousePosition({ x: e.clientX, y: e.clientY })
    setTimeout(() => setShowHearts(false), 1000)
  }

  const handleDragStop = (e: any, data: { x: any; y: any }) => {
    setPosition({ x: data.x, y: data.y })
  }

  const handleThemeToggle = (isDark: boolean) => {
    setIsDarkTheme(isDark)
  }

  const getThemeClasses = () => {
    return isDarkTheme
      ? "bg-slate-950"
      : "" // Remove bg-white from here
  }

  useEffect(() => {
    updateExpandedPosition()
    window.addEventListener('resize', updateExpandedPosition)
    return () => window.removeEventListener('resize', updateExpandedPosition)
  }, [position])

  const updateExpandedPosition = () => {
    if (pillRef.current) {
      const rect = (pillRef.current as HTMLElement).getBoundingClientRect()
      const middleY = window.innerHeight / 2
      setExpandedPosition(rect.top < middleY ? 'bottom' : 'top')
    }
  }

  const handleDrag = (e: any, data: { x: any; y: any }) => {
    setPosition({ x: data.x, y: data.y })
    updateExpandedPosition()
  }

  return (
    <div className={`min-h-screen w-full relative overflow-hidden ${getThemeClasses()}`}>
      {isDarkTheme ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>
      ) : (
        <div className="absolute inset-0 bg-white">
          <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
        </div>
      )}
      <Draggable onStop={handleDragStop} position={position} onDrag={handleDrag}>
        <div ref={pillRef} className="inline-block absolute left-1/2 top-32 -translate-x-1/2">
          <motion.div
            animate={{ y: isExpanded ? (expandedPosition === 'bottom' ? -20 : 20) : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="cursor-move"
          >
            <div onClick={handlePillClick}>
              <WalletPill balance={balance} isDarkTheme={isDarkTheme} />
            </div>
          </motion.div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: expandedPosition === 'bottom' ? 20 : -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: expandedPosition === 'bottom' ? 20 : -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 40 }}
                className={`absolute ${expandedPosition === 'bottom' ? 'top-full' : 'bottom-full'} left-0 w-80 sm:w-96 ${expandedPosition === 'bottom' ? 'mt-3' : 'mb-3'}`}
              >
                <ExpandWalletView balance={balance} isDarkTheme={isDarkTheme} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Draggable>
      <AnimatePresence>
        {showHearts && <FlyingHearts mousePosition={mousePosition} />}
      </AnimatePresence>
      <ThemeToggle onToggle={handleThemeToggle} />
    </div>
  )
}