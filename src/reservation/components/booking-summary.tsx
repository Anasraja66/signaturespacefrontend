"use client"

import Image from "next/image"
import { Star, Info, Check } from "lucide-react"
import CancellationPolicyDialog from "@/components/cancellation-policy-dialog"
import type { Property } from "@/types/property" // Import the Property interface

interface BookingSummaryProps {
  property: Property
}

export default function BookingSummary({ property }: BookingSummaryProps) {
  return (
    <div className="lg:w-96 bg-white p-6 rounded-lg shadow-md">
      {/* Property Details Card */}
      <div className="flex items-start gap-4 mb-6">
        <div className="relative w-24 h-24 flex-shrink-0">
          <Image
            src={property.images[0] || "/placeholder.svg"} // Use the first image from dummy data
            alt={property.title}
            width={96}
            height={96}
            className="rounded-lg object-cover"
          />
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-50 text-white text-xs px-1.5 py-0.5 rounded-full flex items-center">
            <Image src="/placeholder.svg?height=12&width=12" alt="camera" width={12} height={12} className="mr-1" />
            {"25"} {/* Hardcoded as per image, not in dummy data */}
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{property.details}</p>
          <div className="flex items-center text-sm font-semibold text-[#d97706] mb-1">
            <Star className="w-4 h-4 mr-1 text-[#d97706]" fill="#f59e0b" />
            {`${property.rating} (${property.reviewsCount})`}
          </div>
          <p className="text-sm text-gray-500">{property.location}</p>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4 mb-4">
        <p className="text-base font-semibold mb-1">Thu, 08/07 - Sat, 08/09, (2 nights)</p>{" "}
        {/* Dates are hardcoded as per image, not in dummy data for current booking */}
        <p className="text-sm text-gray-600 mb-4">2 guests</p> {/* Guests are hardcoded as per image */}
        <div className="flex justify-between items-center text-sm mb-2">
          <span className="text-gray-700">Price for 2 nights</span>
          <span className="font-medium">
            Rs {property.price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex justify-between items-center text-lg font-bold mb-4">
          <span className="flex items-center">
            Total <Info className="w-4 h-4 ml-1 text-gray-400" />
          </span>
          <span>
            Rs {property.price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-4">Incl. taxes and fees</p>
      </div>
      {/* Inclusions */}
      <div className="border-t border-gray-200 pt-4 mb-6">
        <h3 className="text-base font-semibold mb-3">Incl. in total</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {property.included.map((item, index) => (
            <li key={index} className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" /> {item.text}
            </li>
          ))}
        </ul>
      </div>
      {/* Cancellation Policy Button */}
      <CancellationPolicyDialog /> {/* This component already exists and uses hardcoded policy */}
    </div>
  )
}
