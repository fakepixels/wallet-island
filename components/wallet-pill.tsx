'use client'

import { DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WalletPillProps {
  balance: string;
}

export function WalletPill({ balance }: WalletPillProps) {
  return (
    <Button
      variant="outline"
      className="rounded-full bg-white text-black border-gray-200 hover:bg-gray-100 hover:text-black py-1 px-3 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
    >
      <span className="mr-2 p-1 rounded-full bg-[#0052ff] flex items-center justify-center">
        <DollarSign className="h-4 w-4 text-white" />
      </span>
      <span className="font-semibold">${balance}</span>
    </Button>
  )
}