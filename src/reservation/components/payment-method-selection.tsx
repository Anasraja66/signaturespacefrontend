"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CreditCard, Lock, Headphones } from "lucide-react"
import CancellationPolicyDialog from "@/components/cancellation-policy-dialog"

interface PaymentMethodSelectionProps {
  onNext: () => void
}

export default function PaymentMethodSelection({ onNext }: PaymentMethodSelectionProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Choose how to pay</h2>
      <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <RadioGroup defaultValue="credit-card">
            <RadioGroupItem
              value="credit-card"
              id="credit-card"
              className="text-[#d97706] border-[#d97706] data-[state=checked]:border-[#d97706] data-[state=checked]:text-[#d97706]"
            />
          </RadioGroup>
          <div>
            <Label htmlFor="credit-card" className="font-semibold text-base">
              Credit or debit card
            </Label>
            <p className="text-sm text-gray-500">Pay by providing your card details on the next page</p>
          </div>
        </div>
        <CreditCard className="w-6 h-6 text-gray-500" />
      </div>

      <h2 className="text-2xl font-bold mb-4">Terms and conditions</h2>
      <CancellationPolicyDialog />
      <p className="text-gray-600 text-sm mb-8">
        The rental contract is concluded directly with the provider. By clicking the button below, you accept our{" "}
        <a href="#" className="text-[#d97706] underline">
          Terms of Service
        </a>{" "}
        and the{" "}
        <a href="#" className="text-[#d97706] underline">
          provider's T&Cs
        </a>
        , and acknowledge our{" "}
        <a href="#" className="text-[#d97706] underline">
          Privacy Policy
        </a>
        .
      </p>
      <Button
        onClick={onNext}
        className="w-full py-3 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-[#d97706] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#d97706] transition-all duration-200 mb-6"
      >
        Book and pay
      </Button>

      <div className="flex flex-col sm:flex-row justify-around items-center text-center gap-6 mb-6">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
            <Lock className="w-6 h-6 text-green-500" />
            <span className="text-xs font-semibold text-gray-700 absolute bottom-1">SSL</span>
          </div>
          <h4 className="font-semibold text-sm mb-1">Secure data transmission</h4>
          <p className="text-xs text-gray-500">Your payment data is always protected</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
            <Headphones className="w-6 h-6 text-[#d97706]" />
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
