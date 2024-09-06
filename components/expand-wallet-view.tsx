'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, ArrowDownToLine, RefreshCw, Send, DollarSign, Percent, Copy, Check } from 'lucide-react'
import QRCode from 'react-qr-code' // You'll need to install this package

interface ExpandWalletViewProps {
  balance: string;
}

export function ExpandWalletView({ balance }: ExpandWalletViewProps) {
  const [showQR, setShowQR] = useState(false)
  const [copied, setCopied] = useState(false)

  const toggleQRCode = () => {
    setShowQR(!showQR)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText("tina.base.eth").then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
    })
  }

  return (
    <Card className="w-full shadow-lg bg-white">
      <div className="p-4 space-y-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#0052ff] rounded-full flex items-center justify-center">
                <span className="text-[#0052ff] text-lg font-bold">*</span>
              </div>
              <span className="font-semibold">tina.base.eth</span>
              <button
                onClick={copyToClipboard}
                className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
            <Button variant="ghost" size="icon">
              <Clock className="h-4 w-4" />
              <span className="sr-only">History</span>
            </Button>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold">${balance}</h2>
            <span className="inline-block bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">+0.00%</span>
          </div>

          <Button variant="outline" className="w-full" onClick={toggleQRCode}>
            <ArrowDownToLine className="mr-2 h-4 w-4" /> {showQR ? 'HIDE QR' : 'RECEIVE'}
          </Button>

          <div className="min-h-[300px]"> {/* Add this wrapper with a minimum height */}
            {showQR ? (
              <div className="flex justify-center items-center h-full">
                <QRCode value="Your wallet address here" size={256} />
              </div>
            ) : (
              <>
                <Card className="bg-amber-50 p-3 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-amber-500" aria-hidden="true">⚠️</span>
                    <span className="text-sm">Your Passkey needs a backup.</span>
                  </div>
                  <Button variant="secondary" size="sm">Create Backup</Button>
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
                        coin.symbol === 'BTC' ? 'bg-orange-100' :
                        coin.symbol === 'ETH' ? 'bg-blue-100' :
                        coin.symbol === 'PEPE' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        <span className="text-xl font-bold">{coin.symbol[0]}</span>
                      </div>
                      <div className="flex-grow">
                        <div className="font-semibold">{coin.name}</div>
                        <div className="text-sm text-gray-500">{coin.symbol}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${coin.price}</div>
                        <div className="text-sm text-gray-500">{coin.balance} {coin.symbol}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="bg-gray-900 rounded-lg p-2 flex justify-between">
            <Button variant="ghost" size="sm" className="text-white">
              <RefreshCw className="mr-1 h-4 w-4" /> Swap
            </Button>
            <Button variant="ghost" size="sm" className="text-white">
              <Send className="mr-1 h-4 w-4" /> Send
            </Button>
            <Button variant="ghost" size="sm" className="text-white">
              <DollarSign className="mr-1 h-4 w-4" /> Buy
            </Button>
            <Button variant="ghost" size="sm" className="text-white">
              <Percent className="mr-1 h-4 w-4" /> Stake
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}