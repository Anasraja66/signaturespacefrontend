"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Info, Lock, Headphones } from "lucide-react"

interface PaymentDetailsFormProps {
  onNext: () => void
}

export default function PaymentDetailsForm({ onNext }: PaymentDetailsFormProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Complete the payment</h2>
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Payment methods</h3>
        <div className="flex items-center gap-4">
          <Image
            src="/placeholder.svg?height=24&width=40"
            alt="Visa"
            width={40}
            height={24}
            className="h-6 object-contain"
          />
          <Image
            src="/placeholder.svg?height=24&width=40"
            alt="American Express"
            width={40}
            height={24}
            className="h-6 object-contain"
          />
          <Image
            src="/placeholder.svg?height=24&width=40"
            alt="Mastercard"
            width={40}
            height={24}
            className="h-6 object-contain"
          />
        </div>
      </div>

      <div className="mb-4">
        <Label htmlFor="creditCardNumber" className="text-xs font-semibold text-gray-700 mb-1 block">
          CREDIT CARD NUMBER
        </Label>
        <Input id="creditCardNumber" placeholder="CREDIT CARD NUMBER" required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <Label htmlFor="expirationDate" className="text-xs font-semibold text-gray-700 mb-1 block">
            EXPIRATION DATE
          </Label>
          <Input id="expirationDate" placeholder="MM/YY" required />
        </div>
        <div>
          <Label htmlFor="cvv" className="text-xs font-semibold text-gray-700 mb-1 block">
            CVV (SECURITY CODE) <Info className="inline-block w-3 h-3 ml-1 text-gray-400 align-middle" />
          </Label>
          <Input id="cvv" placeholder="CVV (SECURITY CODE)" required />
        </div>
      </div>

      <Button
        onClick={onNext}
        className="w-full py-3 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-[#d97706] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#d97706] transition-all duration-200 mb-6"
      >
        Pay
      </Button>

      <div className="flex flex-col sm:flex-row justify-around items-center text-center gap-6 mb-6">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
            <Lock className="w-6 h-6 text-gray-500" />
          </div>
          <h4 className="font-semibold text-sm mb-1">Secure data transmission</h4>
          <p className="text-xs text-gray-500">Your payment data is always protected</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
            <Headphones className="w-6 h-6 text-gray-500" />
          </div>
          <h4 className="font-semibold text-sm mb-1">We're here to help</h4>
          <p className="text-xs text-gray-500">Award-winning customer service trusted worldwide</p>
        </div>
      </div>
      <p className="text-center text-xs text-gray-500">
        We only use your data to process bookings and to inform you about our own products. You can object to the use of
        your email address for sending product recommendations at any time.
      </p>
    </>
  )
}
