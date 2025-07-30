"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, X, ChevronRight } from "lucide-react"

interface PersonalDetailsFormProps {
  onNext: () => void
}

export default function PersonalDetailsForm({ onNext }: PersonalDetailsFormProps) {
  const [showAlert, setShowAlert] = useState(true)

  return (
    <>
      {/* Guest's Favorite Alert */}
      {showAlert && (
        <div className="relative flex items-center p-4 mb-8 rounded-lg bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] text-[#d97706] border border-[#FCD34D]">
          <Star className="w-5 h-5 mr-3 text-[#d97706]" fill="#f59e0b" />
          <span className="font-semibold">Guest's favorite!</span> This home has a rating of 4.8
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-[#d97706] hover:bg-[#FCD34D]/20"
            onClick={() => setShowAlert(false)}
          >
            <X className="w-4 h-4" />
            <span className="sr-only">Close alert</span>
          </Button>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-2">Start your booking</h2>
      <p className="text-gray-600 mb-6">Enter your personal details</p>
      {/* Gender Radio Buttons */}
      <RadioGroup defaultValue="mr" className="flex space-x-6 mb-6">
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="mr"
            id="mr"
            className="text-[#d97706] border-[#d97706] data-[state=checked]:border-[#d97706] data-[state=checked]:text-[#d97706]"
          />
          <Label htmlFor="mr">Mr.</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="ms"
            id="ms"
            className="text-[#d97706] border-[#d97706] data-[state=checked]:border-[#d97706] data-[state=checked]:text-[#d97706]"
          />
          <Label htmlFor="ms">Ms.</Label>
        </div>
      </RadioGroup>
      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="firstName" className="sr-only">
            First name *
          </Label>
          <Input id="firstName" placeholder="First name *" required />
        </div>
        <div>
          <Label htmlFor="lastName" className="sr-only">
            Last name *
          </Label>
          <Input id="lastName" placeholder="Last name *" required />
        </div>
        <div>
          <Label htmlFor="email" className="sr-only">
            Email address *
          </Label>
          <Input id="email" type="email" placeholder="Email address *" required />
          <p className="text-xs text-gray-500 mt-1">We'll send your confirmation to this email address</p>
        </div>
        <div>
          <Label htmlFor="phone" className="sr-only">
            Phone number *
          </Label>
          <Input id="phone" type="tel" placeholder="Phone number *" required />
          <p className="text-xs text-gray-500 mt-1">We'll only call if we need to</p>
        </div>
      </div>
      <div className="mb-4">
        <Label htmlFor="address" className="sr-only">
          Address *
        </Label>
        <Input id="address" placeholder="Address *" required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <Label htmlFor="zipCode" className="sr-only">
            ZIP code *
          </Label>
          <Input id="zipCode" placeholder="ZIP code *" required />
        </div>
        <div>
          <Label htmlFor="city" className="sr-only">
            City *
          </Label>
          <Input id="city" placeholder="City *" required />
        </div>
        <div>
          <Label htmlFor="country" className="sr-only">
            Country *
          </Label>
          <Select defaultValue="United States">
            <SelectTrigger id="country">
              <SelectValue placeholder="Country *" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="United States">United States</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="Mexico">Mexico</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mb-6">
        <Label htmlFor="state" className="sr-only">
          State *
        </Label>
        <Select defaultValue="Washington">
          <SelectTrigger id="state">
            <SelectValue placeholder="State *" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Washington">Washington</SelectItem>
            <SelectItem value="California">California</SelectItem>
            <SelectItem value="New York">New York</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Email Preference Checkbox */}
      <div className="flex items-center space-x-2 mb-8">
        <Checkbox
          id="emailDeals"
          defaultChecked
          className="border-[#d97706] data-[state=checked]:bg-[#d97706] data-[state=checked]:text-white"
        />
        <Label
          htmlFor="emailDeals"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Yes, I wish to receive exclusive deals by email
        </Label>
      </div>
      {/* Next Button */}
      <Button
        onClick={onNext}
        className="w-full py-3 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-[#d97706] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#d97706] transition-all duration-200"
      >
        Next <ChevronRight className="w-5 h-5 ml-2" />
      </Button>
      <p className="text-center text-sm text-gray-500 mt-2">You won't be charged yet</p>
    </>
  )
}
