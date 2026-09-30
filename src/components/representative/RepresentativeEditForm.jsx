import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { Loader2, X } from "lucide-react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuthService } from "@/store/useAuthService"
import { SectionHeading } from "./RepresentativeProfile"
import { representativeEditProfileFormValidation } from "@/validations/representativeEditProfileFormValidation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import Cookies from "js-cookie"

const StyledSelectTrigger = ({ className = "", children, ...props }) => (
  <SelectTrigger
    className={`
      h-12 rounded-xl border-2 border-[#27213c]/10 bg-white
      focus:ring-0 focus:ring-offset-0 focus:border-[#FF617C]
      text-[#27213c] font-medium transition-all duration-200
      ${className}
    `}
    {...props}
  >
    {children}
  </SelectTrigger>
)

const StyledInput = ({ className = "", ...props }) => (
  <Input
    className={`
      h-12 rounded-xl border-2 border-[#27213c]/10 bg-white
      focus-visible:ring-0 focus-visible:ring-offset-0
      focus-visible:border-[#FF617C]
      placeholder:text-gray-300 text-[#27213c] font-medium
      transition-all duration-200
      ${className}
    `}
    {...props}
  />
)


const RepresentativeEditForm = ({representative}) => {
  
  const [isLoading, setIsLoading] = useState(false)
  const [stateId, setStateId] = useState(representative?.state_id)
  const [lgaId, setLgaId] = useState(representative?.state_id)

  
    const form = useForm({
      resolver: zodResolver(representativeEditProfileFormValidation),
      defaultValues: {
         address: "",
          email: "",
          gender: "",
          lga: "",
          fullname: "",
          phone: "",
          refercode:"",
          state: ""
      },
    })

    
  const { getStates, getLocalGovernment } = useAuthService()

  const { data: stateData, isLoading: isLoadingStates } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
  })

  const { data: lgaData, isLoading: isLoadingLga } = useQuery({
    queryKey: ["lga", stateId],
    queryFn: () => getLocalGovernment(stateId),
    enabled: !!stateId,
  })

   useEffect(() => {
      form.reset({
        address: representative?.address || "",
        email: representative?.email || "",
        gender: representative?.gender || "",
        lga: representative?.lga || "",
        fullname: representative?.name || "",
        phone: representative?.phone || "",
        state: representative?.state ||"",
      })
    }, [form,representative])
  

  const onSubmit = async (data) => {
    try {
      const formData = {...data,
        state:stateId ?stateId:representative.state_id.toString(),
        lga:lgaId ? lgaId: representative.lga_id.toString()
      }
      
      setIsLoading(true)
      const response = await axios.put("salesrep/edit/", formData, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }
            })
      if (response?.status === 200) {
        toast("Profile updated successfully", { action: { label: <X size={16} /> } })
      }
    } catch (error){
      toast.error("Update failed")
    } finally {
        setIsLoading(false)

    }
  }
  

  return (
    <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                <SectionHeading>Personal Info</SectionHeading>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Fullname */}
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#27213c] font-semibold text-xs uppercase tracking-wider">Full Name</FormLabel>
                        <FormControl><StyledInput placeholder="Your full name" {...field} /></FormControl>
                        <FormMessage className='text-red-600'  />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#27213c] font-semibold text-xs uppercase tracking-wider">Email</FormLabel>
                        <FormControl><StyledInput placeholder="Your email" {...field} /></FormControl>
                        <FormMessage className='text-red-600' />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#27213c] font-semibold text-xs uppercase tracking-wider">Phone</FormLabel>
                        <FormControl><StyledInput placeholder="Phone number" {...field} /></FormControl>
                        <FormMessage className='text-red-600' />
                      </FormItem>
                    )}
                  />

                  {/* Gender */}
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#27213c] font-semibold text-xs uppercase tracking-wider">Gender</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <StyledSelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </StyledSelectTrigger>
                            <SelectContent position="popper" className="bg-white rounded-xl border border-gray-100 shadow-xl">
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className='text-red-600' />
                      </FormItem>
                    )}
                  />
                </div>

                <SectionHeading>Location</SectionHeading>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* State */}
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#27213c] font-semibold text-xs uppercase tracking-wider">State</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(val) => {
                              field.onChange(val)
                              setStateId(val.split(" ").slice(-1)[0])
                            }}
                          >
                            <StyledSelectTrigger>
                              <SelectValue placeholder={representative.state||'Choose a state'} />
                            </StyledSelectTrigger>
                            <SelectContent position="popper" className="bg-white rounded-xl border border-gray-100 shadow-xl">
                              {isLoadingStates ? (
                                <Skeleton className="h-6 w-full m-2" />
                              ) : (
                                stateData?.states?.map((state) => (
                                  <SelectItem key={state.state_id} value={`${state.state_name} ${state.state_id}`}>
                                    {state.state_name}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className='text-red-600' />
                      </FormItem>
                    )}
                  />

                  {/* LGA */}
                  <FormField
                    control={form.control}
                    name="lga"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#27213c] font-semibold text-xs uppercase tracking-wider">LGA</FormLabel>
                        <FormControl>
                            <Select
                            value={field.value}
                            onValueChange={(val) => {
                              field.onChange(val)
                              setLgaId(val.split(" ").slice(-1)[0])
                            }}
                          >
                            <StyledSelectTrigger>
                              <SelectValue placeholder={representative.lga||'Choose LGA'} />
                            </StyledSelectTrigger>
                            <SelectContent position="popper" className="bg-white rounded-xl border border-gray-100 shadow-xl">
                              {isLoadingLga ? (
                                <Skeleton className="h-6 w-full m-2" />
                              ) : (
                                Array.isArray(lgaData)? lgaData?.map((lga) => (
                                  <SelectItem key={lga.id} value={`${lga.name} ${lga.id}`}>
                                    {lga.name}
                                  </SelectItem>
                                )):<p>Choose state before L.G.A</p>
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className='text-red-600' />
                      </FormItem>
                    )}
                  />

                  {/* Address */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel className="text-[#27213c] font-semibold text-xs uppercase tracking-wider">Address</FormLabel>
                        <FormControl><StyledInput placeholder="Your address" {...field} /></FormControl>
                        <FormMessage className='text-red-600' />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="
                    w-full h-12 rounded-xl font-bold text-white text-sm
                    flex items-center justify-center gap-2
                    transition-all duration-200 shadow-lg
                    disabled:opacity-70 disabled:cursor-not-allowed
                    hover:shadow-[#FF617C]/40 hover:scale-[1.01] active:scale-[0.99]
                  "
                  style={{
                    background: isLoading
                      ? "#27213c"
                      : "linear-gradient(135deg, #FF617C 0%, #e04466 100%)",
                    boxShadow: "0 4px 20px rgba(255,97,124,0.35)",
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Saving changes…
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>

              </form>
            </Form>
  )
}

export default RepresentativeEditForm