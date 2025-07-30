"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface BookingConfirmationProps {
  onReset: () => void
}

export default function BookingConfirmation({ onReset }: BookingConfirmationProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-12">
      <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
      <h2 className="text-3xl font-bold mb-4 text-center">Booking Confirmed!</h2>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Your booking has been successfully completed. A confirmation email has been sent.
      </p>
      <Button
        onClick={onReset}
        className="py-3 px-8 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-[#d97706] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#d97706] transition-all duration-200"
      >
        Go to Home
      </Button>
    </div>
  )
}
