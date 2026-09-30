import React from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate, useSearchParams } from "react-router-dom"

const paymentData = {
  amount: 2240000,
  ip: "102.89.82.255",
  message: "Activation successful",
  status: "paid",
}

const SuccessfulSubscription = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount)
  }
    

  return (
    <>
    
    <div className="min-h-screen mt-12 md:mt-0 md:flex items-center justify-center bgd-gray-50 p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl w-full text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle size={60} className="text-green-500" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2">
          Subscription Successful
        </h2>

        {/* Message */}
        <p className="text-gray-500 mb-6">
          {paymentData.message}
        </p>

        {/* Payment Details */}
        <div className="space-y-3 text-left border rounded-lg p-4 mb-6">

          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span className="font-semibold text-green-600 capitalize">
              {searchParams?.get('status')}
              
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Plan</span>
            <span className="font-semibold">
              {formatCurrency(searchParams?.get('plan'))}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">End Date</span>
            <span className="font-semibold">
              {searchParams?.get('end_date')}
            </span>
          </div>
        </div>

        {/* Continue Button */}
        <Button
          className="w-full text-white"
          onClick={() => navigate("/creator/profile")}
        >
          Continue
        </Button>

      </div>
    </div>

    </>

  )
}

export default SuccessfulSubscription