import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  Pencil, X, Camera,
  MapPin, Phone, Mail, User,
 Shield
} from "lucide-react"

import { representativeFormValidation } from "@/validations/representativeFormValidation"
import RepresentativeEditForm from "./RepresentativeEditForm"
import { useAdminRepresentativeStore } from "@/store/admin/useAdminRepresentativeStore"
import { Link, useParams } from "react-router-dom"
import UserProfileLoader from "../global/loaders/ProfileLoaders"
import ErrorMessage from "../global/ErrorMessage"
import { useAuth } from "@/store/useAuth"
import { Button } from "../ui/button"
import axios from "axios"
import Cookies from "js-cookie"
import { toast } from "sonner"


// ─── Info row for view mode ───────────────────────────────────────────────────
const InfoCard = ({ icon: Icon, label, value, accent = false }) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-[#FF617C]/30 hover:shadow-sm transition-all duration-200 group">
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200"
      style={{
        backgroundColor: accent ? "rgba(255,97,124,0.10)" : "rgba(39,33,60,0.07)",
        color: accent ? "#FF617C" : "#27213c",
      }}
    >
      <Icon size={17} />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">{label}</p>
      <p className="text-[#27213c] font-semibold text-sm truncate">{value || "—"}</p>
    </div>
  </div>
)

// ─── Section heading ──────────────────────────────────────────────────────────
export const SectionHeading = ({ children }) => (
  <p className="text-[10px] font-bold uppercase tracking-widest text-[#FF617C] mb-3 mt-6 first:mt-0">
    {children}
  </p>
)

// ─── Main component ───────────────────────────────────────────────────────────
const RepresentativeProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const {user} = useAuth();
  const [preview,setPreview] = useState(null)
  const {getSalesRepresentativeList,getSalesRepresentativeProfile} = useAdminRepresentativeStore()
  const {referCode} = useParams();

  const isRepresentative = user?.role === 'representative';
  
 const { data, isLoading,isError,error } = useQuery({
    queryKey: [isRepresentative ? "representative-profile":"admin-representative-profile"],
    queryFn: ()=> isRepresentative ? 
    getSalesRepresentativeProfile(referCode):
    getSalesRepresentativeList(referCode),
    staleTime:1000*30*2,
    refetchOnReconnect:true
    
  })

  const handleImageUpload = async(e)=>{
    const pic = e.target.files[0]
      if (pic) {
        setPreview(URL.createObjectURL(pic))
      }
      try{
          const response = await axios.put('salesrep/update/profilepic',{pic}, {
          headers:{
            Authorization:`Bearer ${Cookies.get('token')}`,
            'Content-Type':'multipart/form-data'
          },
          withCredentials:true  
        })
        if(response.status === 200){
            toast("profile picture successfully", {
                action: {
                label: <X size={16} />,
              },
            })
        }
      }catch(error){

         toast(error?.response?.data?.message||error?.message, {
                action: {
                label: <X size={16} />,
              },
            })
      setPreview(data?.salesrep?.pic||null)
      }
  }

  useEffect(()=>{
    if(data?.salesrep.pic){
      setPreview(data?.salesrep?.pic)
    }
    
  },[data])

  
  

  return (
    <div className="min-h-screen py-10 px-4">
     {
      isLoading ? <UserProfileLoader />:
      isError ? <ErrorMessage error={error}/>:
       <div className="max-w-2xl mx-auto space-y-4 ">

        {/* ── Hero card ── */}
        <div
          className="relative rounded-3xl overflow-hidden shadow-xl"
          style={{ background: "linear-gradient(135deg, #27213c 0%, #3d3060 60%, #FF617C 100%)" }}
        >
          {/* subtle grid texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 px-8 pt-10 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">

              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-28 h-28 rounded-2xl ring-4 ring-white/20 overflow-hidden shadow-2xl">
                  {preview ?(
                    <img src={preview} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-white/10 flex items-center justify-center">
                      <User size={40} className="text-white/50" />
                    </div>
                  )}
                </div>

                {isEditing && (
                  <>
                    <input
                      type="file"
                      id="avatar-file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e)}
                    />
                    <label
                      htmlFor="avatar-file"
                      className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#FF617C] rounded-xl flex items-center justify-center cursor-pointer shadow-lg hover:bg-[#ff4a68] transition-colors"
                    >
                      <Camera size={14} className="text-white" />
                    </label>
                  </>
                )}
              </div>

              {/* Name & meta */}
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 bg-white/15 text-white/80 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                  <Shield size={10} />
                  Sales Representative
                </div>
                <h1 className="text-2xl font-bold text-white leading-tight">{data?.salesrep.name}</h1>
                <p className="text-white/60 text-sm mt-1">{data?.salesrep.email}</p>
              </div>

              {/* Referral badge */}
              <div className="flex-shrink-0 text-center">
                <div className="bg-white/10 backdrop-blur rounded-2xl px-5 py-3 border border-white/20">
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">Ref Code</p>
                  <p className="text-2xl font-black text-white tracking-widest">{data?.salesrep?.refercode||user?.referCode||referCode}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Edit / Cancel button strip */}
          <div
            className="relative z-10 px-8 py-3 flex justify-end border-t border-white/10"
            style={{ background: "rgba(0,0,0,0.15)" }}
          >
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-[#FF617C] hover:bg-[#ff4a68] text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors shadow-lg shadow-[#FF617C]/30"
              >
                <Pencil size={14} />
                Edit Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors"
              >
                <X size={14} />
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* ── Content card ── */}
        <div className={`bg-white rounded-3xl ${!isRepresentative?'shadow-md':'shadow-sm'} border border-gray-100 p-6`}>

          {!isEditing ? (
            // ═══════════ VIEW MODE ═══════════
            <>
              <SectionHeading>Personal Info</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InfoCard icon={User}  label="Full Name" value={data?.salesrep.name} />
                <InfoCard icon={Mail}  label="Email"     value={data?.salesrep.email}    accent />
                <InfoCard icon={Phone} label="Phone"     value={data?.salesrep.phone}    />
                <InfoCard icon={User}  label="Gender"    value={data?.salesrep.gender}   accent />
              </div>

              <SectionHeading>Location</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InfoCard icon={MapPin} label="State"   value={data?.salesrep.state}   accent />
                <InfoCard icon={MapPin} label="LGA"     value={data?.salesrep.lga}     />
                <InfoCard icon={MapPin} label="Address" value={data?.salesrep.address} accent />
              </div>
              <div className="mt-3 shadow-md p-4 rounded-3xl border">
                <SectionHeading>Payment</SectionHeading>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InfoCard icon={MapPin} label="Client payout"   value={data?.client_payout}   accent />
                  <InfoCard icon={MapPin} label="Subscription payout"     value={data?.subscription_payout}     />
                </div>
             {
              !isRepresentative&&
                <Button className='w-full mt-3 text-white'>Pay</Button>
              }
             </div>
             {
              !isRepresentative&&
             <p className="text-primary capitalize mt-3"><Link to={`/admin/representatives/profile/${referCode}/referrals`}>view referrals</Link></p>
             }
            </>
          ) : (
            // ═══════════ EDIT MODE ═══════════
            <RepresentativeEditForm representative={data?.salesrep}/>
          )}
        </div>


      </div>

     }
    </div>
  )
}

export default RepresentativeProfile