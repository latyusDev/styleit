import React from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate, useSearchParams } from "react-router-dom"


const SuccessfulPayment = () => {
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
          Payment Successful
        </h2>

        {/* Message */}
        <p className="text-gray-500 mb-6">
          Transaction payment successful
        </p>

        {/* Payment Details */}
        <div className="space-y-3 text-left border rounded-lg p-4 mb-6">

          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span className="font-semibold text-green-600 capitalize">
              Paid
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Amount</span>
            <span className="font-semibold">
              {formatCurrency(searchParams?.get(' amount'))}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Reference</span>
            <span className="font-semibold">
              {searchParams?.get('trxref')}
            </span>
          </div>

        </div>

        {/* Continue Button */}
        <Button
          className="w-full text-white"
          onClick={() => navigate("/client/appointmentDetails")}
        >
          Continue
        </Button>

      </div>
    </div>

    </>

  )
}

export default SuccessfulPayment