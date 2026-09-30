import { AlertCircle } from 'lucide-react'
import React from 'react'

const PaymentNotFound = ({searchData}) => {
  return (
    <div className="min-h-screen p-3 mt-[8rem] md:p-6  md:mt">

      {/* Empty State Card */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-200 p-3 md:p-12">
          <div className="max-w-md mx-auto text-center">
            {/* Icon */}
            <div className="flex justify-center mt-2 md:mt-0 mb-6">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
                <AlertCircle size={40} className="text-[#FF617C]" strokeWidth={2} />
              </div>
            </div>

            {/* Main Message */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              No Payment Found
            </h2>
            <p className="text-gray-600 mb-2 text-lg">
              Reference number <span className="font-mono font-semibold text-gray-900">{searchData}</span> does not exist in the system.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              The payment details you're looking for could not be found. Please verify the reference number and try again.
            </p>


            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-sm text-gray-500">Possible reasons</span>
              </div>
            </div>

            {/* Suggestions */}
            <div className="text-left space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#FF617C] font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Incorrect reference number:</span> Double-check for typos or formatting errors
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#FF617C] font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Payment not processed yet:</span> Recent transactions may take time to sync
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#FF617C] font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Payment was deleted:</span> The transaction may have been removed from the system
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentNotFound