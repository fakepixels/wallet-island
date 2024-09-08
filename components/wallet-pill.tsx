'use client'

import { DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WalletPillProps {
  balance: string;
  isDarkTheme: boolean;
}

export function WalletPill({ balance, isDarkTheme }: WalletPillProps) {
  const themeClasses = isDarkTheme
    ? "bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20 hover:text-white"
    : "bg-white text-black border-gray-200 hover:bg-gray-100"

  return (
    <Button
      variant="outline"
      className={`rounded-full ${themeClasses} py-1 px-3 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md`}
    >
      <span className="mr-2 p-1 rounded-full bg-[#0052ff] flex items-center justify-center">
        <DollarSign className="h-4 w-4 text-white" />
      </span>
      <span className="font-semibold">${balance}</span>
    </Button>
  )
}