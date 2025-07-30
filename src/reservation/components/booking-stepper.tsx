interface BookingStepperProps {
  currentStep: number
}

export default function BookingStepper({ currentStep }: BookingStepperProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex flex-col items-center flex-1">
        <div
          className={`w-full h-2 ${currentStep >= 1 ? "bg-gradient-to-r from-[#d97706] to-[#f59e0b]" : "bg-gray-200"} rounded-full mb-2`}
        ></div>
        <span className={`text-sm font-medium ${currentStep >= 1 ? "text-[#d97706]" : "text-gray-500"}`}>
          Personal details
        </span>
      </div>
      <div className="flex flex-col items-center flex-1 ml-4">
        <div
          className={`w-full h-2 ${currentStep >= 2 ? "bg-gradient-to-r from-[#d97706] to-[#f59e0b]" : "bg-gray-200"} rounded-full mb-2`}
        ></div>
        <span className={`text-sm ${currentStep >= 2 ? "font-medium text-[#d97706]" : "text-gray-500"}`}>
          Payment method
        </span>
      </div>
      <div className="flex flex-col items-center flex-1 ml-4">
        <div
          className={`w-full h-2 ${currentStep >= 3 ? "bg-gradient-to-r from-[#d97706] to-[#f59e0b]" : "bg-gray-200"} rounded-full mb-2`}
        ></div>
        <span className={`text-sm ${currentStep >= 3 ? "font-medium text-[#d97706]" : "text-gray-500"}`}>
          Payment details
        </span>
      </div>
      <div className="flex flex-col items-center flex-1 ml-4">
        <div
          className={`w-full h-2 ${currentStep >= 4 ? "bg-gradient-to-r from-[#d97706] to-[#f59e0b]" : "bg-gray-200"} rounded-full mb-2`}
        ></div>
        <span className={`text-sm ${currentStep >= 4 ? "font-medium text-[#d97706]" : "text-gray-500"}`}>Done</span>
      </div>
    </div>
  )
}
