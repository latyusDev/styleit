import { useAdminRepresentativeStore } from "@/store/admin/useAdminRepresentativeStore"
import { useQuery } from "@tanstack/react-query"
import React, { useState } from "react"
import AdminUserLoader from "../global/loaders/AdminUserLoader"
import ErrorMessage from "../global/ErrorMessage"
import ReferralCard from "./ReferralCard"
import RepresentativeReferral from "./RepresentativeReferral"
import { useAuth } from "@/store/useAuth"
import { useParams } from "react-router-dom"


const RepresentativeReferrals = () => {
  const [activeTab, setActiveTab] = useState("creators")
  const {user} = useAuth()
  const {referCode} = useParams()
  const isRepresentative = user?.role === 'representative'
   const {getSalesRepresentativeProfile,getSalesRepresentativeList} = useAdminRepresentativeStore()
   const { data, isLoading,isError,error } = useQuery({
      queryKey: ["representative-referred-user",referCode],
      queryFn:()=>isRepresentative?getSalesRepresentativeProfile(user?.referCode):
      getSalesRepresentativeList(referCode),
      staleTime:1000*60*2
    })
  
  const dataItem = activeTab === 'creators' ? data?.referred_creators:data?.referred_clients
  const isEmpty = dataItem?.length === 0;
  const isClient = activeTab === 'clients'
  
  return (
   <div className="container">
      {
        isLoading ? <AdminUserLoader/>:
        isError ? <ErrorMessage error={error}/>:
        <div className="p-6">

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("creators")}
          className={`px-4 py-2 rounded-xl  ${
            !isClient
              ? "bg-[#27213c] text-white"
              : "border border-gray-300"
          }`}
        >
          Creators
        </button>

        <button
          onClick={() => setActiveTab("clients")}
          className={`px-4 py-2 rounded-xl ${
            isClient
              ? "bg-[#27213c] text-white"
              : "border border-gray-300"
          }`}
        >
          Clients
        </button>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid  grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-3 font-semibold text-gray-600 mb-3 px-4">
        <p>User</p>
        {
          isClient ? <p>Username</p>: <p>Business Name</p>
        }
        <p>First Name</p>
        <p>Last Name</p>
        <p>Ref Code</p>
        <p>Phone</p>
        <p>Status</p>
      </div>

      {/* Rows */}
      {
        isEmpty ? <div className="max-w-4xl shadow-lg border mx-auto rounded-md py-16 text-center mt-10">
          <p> {!isRepresentative ? `${data?.salesrep?.name}`:'You have'}  not referred any {activeTab}</p>
        </div>:
      <div className="space-y-4">
        {dataItem?.map((user) => (
          <>

          <RepresentativeReferral user={user} isClient={isClient}/>

          <ReferralCard referral={user} isClient={isClient}/>
          
          </>
        ))}
      </div>
      }
    </div>
      }
   </div> 
  )
}

export default RepresentativeReferrals