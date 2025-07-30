"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Lock, X, Home } from "lucide-react"

export default function CancellationPolicyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full py-2 text-[#d97706] border-[#d97706] hover:bg-[#d97706]/10 bg-transparent"
        >
          <Lock className="w-4 h-4 mr-2" /> View cancellation policy
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6 rounded-lg shadow-lg">
        <DialogHeader className="relative mb-6">
          <DialogTitle className="text-2xl font-bold text-center">Cancellation policy</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="absolute top-0 left-0 text-gray-500 hover:bg-gray-100">
              <X className="w-5 h-5" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="flex items-center justify-between relative mb-8">
          <div className="absolute left-0 right-0 h-0.5 bg-gray-200 top-1/2 -translate-y-1/2"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-gray-400 mb-2"></div>
            <span className="font-semibold text-sm">Before Aug 7 2025</span>
            <span className="text-sm text-gray-500">No refund</span>
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mb-2">
              <Home className="w-4 h-4 text-gray-500" />
            </div>
            <span className="font-semibold text-sm">Aug 7 2025</span>
            <span className="text-sm text-gray-500">Check-in</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
