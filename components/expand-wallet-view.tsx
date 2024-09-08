'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowDownToLine, RefreshCw, Send, DollarSign, Percent, Copy, Check, Wallet, Expand, Minimize } from 'lucide-react'
import QRCode from 'react-qr-code'
import { motion, AnimatePresence } from 'framer-motion'

interface ExpandWalletViewProps {
  balance: string;
  isDarkTheme: boolean;
}

export function ExpandWalletView({ balance, isDarkTheme }: ExpandWalletViewProps) {
  const [showQR, setShowQR] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleQRCode = () => {
    setShowQR(!showQR)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText("tina.base.eth").then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const themeClasses = isDarkTheme
    ? "bg-white/10 backdrop-blur-md text-white border-white/20"
    : "bg-white text-black border-gray-200"

  const iconColor = isDarkTheme ? "text-white" : "text-gray-600"
  const buttonHoverBg = isDarkTheme ? "hover:bg-white/20" : "hover:bg-white"
  const secondaryBg = isDarkTheme ? "bg-white/10" : "bg-gray-100"

  const buttonTextColor = isDarkTheme ? "text-white" : "text-black"
  const buttonHoverTextColor = isDarkTheme ? "hover:text-white" : "text-black"

  const animationConfig = {
    initial: "collapsed",
    animate: isExpanded ? "expanded" : "collapsed",
    exit: "collapsed",
    variants: {
      expanded: { opacity: 1, height: "auto" },
      collapsed: { opacity: 0, height: 0 }
    },
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      mass: 1,
      opacity: { duration: 0.2 }
    }
  };

  return (
    <Card className={`w-full shadow-lg ${themeClasses}`}>
      <div className="p-4 space-y-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#0052ff] rounded-full flex items-center justify-center">
              </div>
              <span className="font-semibold">tina.base.eth</span>
              <button
                onClick={copyToClipboard}
                className={`ml-2 p-1 rounded-full ${buttonHoverBg} transition-colors duration-200`}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className={`h-4 w-4 ${iconColor}`} />
                )}
              </button>
              <a
                href="https://wallet.coinbase.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`ml-2 p-1 rounded-full ${buttonHoverBg} transition-colors duration-200`}
              >
                <Wallet className={`h-4 w-4 ${iconColor}`} />
              </a>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`${iconColor} ${buttonHoverBg}`}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <Minimize className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
              <span className="sr-only">{isExpanded ? 'Collapse' : 'Expand'}</span>
            </Button>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold">${balance}</h2>
            <span className={`inline-block ${isDarkTheme ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-600'} text-xs px-2 py-1 rounded-full`}>+0.00%</span>
          </div>

          <AnimatePresence initial={false}>
            <motion.div
              key="content"
              {...animationConfig}
            >
              {isExpanded && (
                <div className="space-y-4 overflow-hidden">
                  <Button variant="outline" className={`w-full ${secondaryBg} ${isDarkTheme ? 'text-white border-white/20' : 'text-black border-gray-200'} ${buttonHoverBg}`} onClick={toggleQRCode}>
                    <ArrowDownToLine className="mr-2 h-4 w-4" /> {showQR ? 'HIDE QR' : 'RECEIVE'}
                  </Button>

                  <div className="min-h-[300px]">
                    {showQR ? (
                      <div className="flex justify-center items-center h-full">
                        <QRCode value="Your wallet address here" size={256} />
                      </div>
                    ) : (
                      <>
                        <Card className={`${isDarkTheme ? 'bg-amber-500/20 border-amber-500/20' : 'bg-amber-50 border-amber-200'} p-3 flex justify-between items-center`}>
                          <div className="flex items-center space-x-2">
                            <span className={isDarkTheme ? "text-amber-300" : "text-amber-500"} aria-hidden="true">⚠️</span>
                            <span className={`text-sm ${isDarkTheme ? "text-amber-300" : "text-amber-700"}`}>Your Passkey needs a backup.</span>
                          </div>
                          <Button variant="secondary" size="sm" className={isDarkTheme ? "bg-amber-500/20 text-amber-300 hover:bg-amber-500/40" : "bg-amber-100 text-amber-700 hover:bg-amber-200"}>Create Backup</Button>
                        </Card>

                        <div className="space-y-3 mt-4">
                          {[
                            { name: 'Bitcoin', symbol: 'BTC', price: '55,984.68', balance: '0' },
                            { name: 'Ethereum', symbol: 'ETH', price: '2,361.78', balance: '0' },
                            { name: 'PEPE', symbol: 'PEPE', price: '0.000001', balance: '0' },
                            { name: 'USDC', symbol: 'USDC', price: '1.00', balance: '0' },
                          ].map((coin) => (
                            <div key={coin.symbol} className="flex items-center">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                                coin.symbol === 'BTC' ? (isDarkTheme ? 'bg-orange-500/20' : 'bg-orange-100') :
                                coin.symbol === 'ETH' ? (isDarkTheme ? 'bg-blue-500/20' : 'bg-blue-100') :
                                coin.symbol === 'PEPE' ? (isDarkTheme ? 'bg-green-500/20' : 'bg-green-100') : 
                                (isDarkTheme ? 'bg-blue-500/20' : 'bg-blue-100')
                              }`}>
                                <span className="text-xl font-bold">{coin.symbol[0]}</span>
                              </div>
                              <div className="flex-grow">
                                <div className="font-semibold">{coin.name}</div>
                                <div className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>{coin.symbol}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">${coin.price}</div>
                                <div className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>{coin.balance} {coin.symbol}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className={`${isDarkTheme ? 'bg-white/10' : 'bg-gray-100'} rounded-lg p-2 flex justify-between`}>
            {['Swap', 'Send', 'Buy', 'Stake'].map((action, index) => (
              <Button key={action} variant="ghost" size="sm" className={`${isDarkTheme ? 'text-white' : 'text-gray-700'} ${buttonHoverBg}`}>
                {[<RefreshCw />, <Send />, <DollarSign />, <Percent />][index]}
                <span className="ml-1">{action}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}