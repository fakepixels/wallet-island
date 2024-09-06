'use client'

import { useState, useRef, useEffect } from 'react'
import Draggable from 'react-draggable'
import { motion, AnimatePresence } from 'framer-motion'
import { WalletPill } from "@/components/wallet-pill"
import { ExpandWalletView } from "@/components/expand-wallet-view"
import { FlyingHearts } from "@/components/FlyingHearts"

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
  const pillRef = useRef(null)

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

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <Draggable onStop={handleDragStop} position={position}>
        <div ref={pillRef} className="inline-block absolute left-1/2 top-32 -translate-x-1/2">
          <motion.div
            animate={{ y: isExpanded ? -20 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="cursor-move"
          >
            <div onClick={handlePillClick}>
              <WalletPill balance={balance} />
            </div>
          </motion.div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 40 }}
                className="absolute top-full left-0 w-80 sm:w-96 mt-3"
              >
                <ExpandWalletView balance={balance} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Draggable>
      <AnimatePresence>
        {showHearts && <FlyingHearts mousePosition={mousePosition} />}
      </AnimatePresence>
    </div>
  )
}