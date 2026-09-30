import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { toast } from "sonner"
import { Loader2, X } from "lucide-react"
import m_logo from '@/images/m_logo.png'
import picture from '@/images/upload.png'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "../global/Image"
import { representativeFormValidation } from "@/validations/representativeFormValidation"
import { useQuery } from "@tanstack/react-query"
import { useAuthService } from "@/store/useAuthService"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Skeleton } from "../ui/skeleton"
import { Link, useNavigate } from "react-router-dom"
import ErrorMessage from "../global/ErrorMessage"
import AnimatedButton from "../global/AnimatedButton"

const RepresentativeSignUpForm = () => {
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [stateId, setStateId] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()


  const { getStates, getLocalGovernment } = useAuthService()

  const form = useForm({
    resolver: zodResolver(representativeFormValidation),
    defaultValues: {
      fullname: "Yunus Uthman",
      email: "uth@gmail.com",
      phone: "11111111111",
      address: "aaa",
      pwd: "11111111",
      cpwd: "11111111",
      state: "",
      lga: "",
      gender: "",
      pic: null,
    },
  })

  const onSubmit = async (data) => {
    try {
      setLoading(true)

      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value)
          if(key === 'state' || key === 'lga'){
              formData.set(key, value.split(' ').slice(-1))
            }
      })

      const response = await axios.post("postsalesrepresentative/", formData)
      if (response?.status === 200) {
        toast("Registration successful", {
          action: { label: <X size={16} /> },
        })
        localStorage.setItem('email',data.email)
        navigate('/verifyAccount')
        setPreview(null)
      }
    } catch (error) {
        setError(error?.response?.data?.message)
        if(error.response === 400){
             form.setError('email', {
                type: 'manual',
                message: error?.response?.data?.message,
            })
        }
      toast.error(error?.response?.data?.message || error?.message == 'Network Error' && 'Your account is not created, pls try again')
    } finally {
      setLoading(false)
    }
  }

  const { data: stateData, isLoading: isLoadingStates, isError:isErrorState,error:stateError } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
    retry:2,
    staleTime:1000*60*5,
    refetchOnReconnect:true,
    refetchOnWindowFocus:false
  })

  const { data: lgaData, isLoading: isLoadingLga, error:lgaError, isError:isErrorLga } = useQuery({
    queryKey: ["lga", stateId],
    queryFn: () => getLocalGovernment(stateId),
    retry:2,
    staleTime:1000*60*5,
    refetchOnReconnect:true,
    refetchOnWindowFocus:false,
    enabled: !!stateId,
  })
  

  return (
    <div className="max-w-2xl mx-auto bg-white mt-10 shadow-md p-8 border rounded-md">
      <Image src={m_logo} className="mx-auto mb-2" />

      <h1 className="text-center font-semibold text-xl mb-6">
        Become our representative today
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Fullname */}
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input className="border border-secondary py-6 rounded-xl" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="border border-secondary py-6 rounded-xl" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                  {
                    error&& <p className="text-red-500" >{error}</p>
                  }
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="pwd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="border border-secondary py-6 rounded-xl" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="cpwd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="border border-secondary py-6 rounded-xl" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input className="border border-secondary py-6 rounded-xl" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input className="border border-secondary py-6 rounded-xl" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* State */}
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      // onValueChange={(val) => {
                      //   field.onChange(val)
                      //   const id = val?.split(" ")?.slice(-1)
                      //   if (id) setStateId(id)
                      // }}
                      onValueChange={(val) => {
                        field.onChange(val)
                        const id = val?.split(" ")?.slice(-1)[0]  
                        if (id) setStateId(id)
                      }}
                    >
                      <SelectTrigger className="w-full border border-secondary py-6 rounded-xl">
                        <SelectValue placeholder="Choose state" />
                      </SelectTrigger>

                      <SelectContent position="popper" className='bg-white'>
                        {isLoadingStates
                          ? 
                          <div>
                          <Skeleton data-testid="skeleton" className="w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                          <Skeleton data-testid="skeleton" className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                          <Skeleton data-testid="skeleton" className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                          <Skeleton data-testid="skeleton" className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                          <Skeleton data-testid="skeleton" className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />

                          </div>
                          : isErrorState ?
                          <ErrorMessage error={stateError} />:
                          stateData?.states?.map((state) => (
                              <SelectItem
                                key={state.state_id}
                                value={`${state.state_name} ${state.state_id}`}
                              >
                                {state.state_name}
                              </SelectItem>
                            ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* LGA */}
            <FormField
              control={form.control}
              name="lga"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LGA</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full border border-secondary py-6 rounded-xl">
                        <SelectValue placeholder="Choose LGA" />
                      </SelectTrigger>

                      <SelectContent position="popper" className='bg-white'>
                        {isLoadingLga
                          ? 
                             <div>
                                    <Skeleton data-testid="skeleton"  className="w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                    <Skeleton data-testid="skeleton"  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                    <Skeleton data-testid="skeleton"  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                    <Skeleton data-testid="skeleton"  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                    <Skeleton data-testid="skeleton"  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                          </div>:
                          isErrorLga ? <ErrorMessage error={lgaError}/>:
                          Array.isArray(lgaData)? lgaData?.map((lga) => (
                              <SelectItem
                                key={lga.id}
                                value={`${lga.name} ${lga.id}`}
                              >
                                {lga.name}
                              </SelectItem>
                            )): 'Choose state before L.G.A'
                         }
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <div className="flex gap-6 mt-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="male"
                          checked={field.value === "male"}
                          onChange={field.onChange}
                        />
                        Male
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="female"
                          checked={field.value === "female"}
                          onChange={field.onChange}
                        />
                        Female
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <FormField
              control={form.control}
              name="pic"
              render={({ field }) => (
                <FormItem className="md:col-span-2 flex flex-col items-center">
                  <FormLabel>Upload Picture</FormLabel>

                  <FormControl>
                    <>
                      {!preview ? (
                        <>
                          <Input
                            type="file"
                            className="hidden"
                            id="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0]
                              field.onChange(file)
                              if (file) setPreview(URL.createObjectURL(file))
                            }}
                          />
                          <label htmlFor="file" className="cursor-pointer">
                            <img
                              src={picture}
                              alt="upload"
                              className="w-24 h-24 rounded-full"
                            />
                          </label>
                        </>
                      ) : (
                        <div className="relative">
                          <img
                            src={preview}
                            alt="preview"
                            className="w-24 h-24 rounded-full object-cover border"
                          />

                          <X
                            size={18}
                            className="absolute -top-2 -right-2 bg-white rounded-full shadow cursor-pointer"
                            onClick={() => {
                              field.onChange(null)
                              setPreview(null)
                            }}
                          />
                        </div>
                      )}
                    </>
                  </FormControl>

                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

          </div>

         <AnimatedButton>
           <Button type="submit" className="w-full text-white" disabled={loading}>
            {loading ? <span className="flex items-center gap-1"><Loader2 className="size-4 animate-spin"/> Submitting...</span> : "Sign Up"}
          </Button>
         </AnimatedButton>
              <p className="text-center">Already have an account ? <Link className="text-primary" to={'/representative/login'}>Login</Link></p>
        </form>
      </Form>
    </div>
  )
}

export default RepresentativeSignUpForm