import Image from '@/components/global/Image'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import avatar from '@/images/avatar_profile.png'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Indicator from '@/components/global/Indicator'
import {useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Cookies from 'js-cookie' 
import { designerEditFormSchema } from '@/validations/designerEditFormValidation'
import { toast } from 'sonner'
import { Loader2, X } from 'lucide-react'
import { useAuth } from '@/store/useAuth'
import { useProfileStore } from '@/store/useProfile'
import { useAuthService } from '@/store/useAuthService'
import UserProfileLoader from '@/components/global/loaders/ProfileLoaders'
import ErrorMessage from '@/components/global/ErrorMessage'
import SingleLoader from '@/components/global/loaders/SingleLoader'
import { Select, SelectContent, SelectItem, SelectTrigger,SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'


const CreatorEditProfileForm = () => {
  const [uploadedImage,setUploadedImage] = useState(avatar)
  const [stateId, setStateId] = useState(null)
  const [countryId, setCountryId] = useState(null)
  const [lgaId, setLgaId] = useState(null)
  const {user} = useAuth();
  const {getLocalGovernment,getCountries,getStates} = useAuthService();
  const {getProfileDetails,updateProfileDetails,updateBankDetails} = useProfileStore();
  const isDesigner = user?.role === 'designer'

  const { data, isLoading,isError,error } = useQuery({
    queryKey: ['user-profile',user?.role],
    queryFn:()=>getProfileDetails(user),
    enabled: !!user,
    refetchOnWindowFocus:false
  })

    const { data:countryData, isLoading:CountryLoader, error:countryError } = useQuery({
      queryKey: ['countries'],
      queryFn: getCountries,
      staleTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    });

      const { data: stateData, isLoading: isLoadingStates, error: stateError, isError: isErrorState } = useQuery({
        queryKey: ['states'],
        queryFn: getStates,
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
      })
  

  const form = useForm({
    resolver: zodResolver(designerEditFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      lga: '',
      states:'',
      cities:'',
      state:'',
      mobile: '',
      bank: '',
      accountName:'',
      bank_acc: '',
      address: '',
      image:''
    }
  })

  useEffect(() => {
  if (!data?.data || !countryData) return

  const getCountry = countryData?.country?.find(
    _country => _country.country_name === data?.data?.creator?.country
  )
  const resolvedCountryId = getCountry?.country_id
  const _stateId = data?.data?.creator?.state?.[0]?.id
  const _lgaId = data?.data?.creator?.lga?.[0]?.id

  setCountryId(resolvedCountryId)
  if (_stateId || _lgaId) {
    setStateId(_stateId)
    setLgaId(_lgaId)
  }

  const isNigerianLocal = Number(resolvedCountryId) === 161

  form.reset({
    firstName: data?.data?.creator?.firstName || '',
    lastName: data?.data?.creator?.lastName || '',
    email: data?.data?.creator?.email || '',
    country: data?.data?.creator?.country || '',
    lga: data?.data?.creator?.lga?.[0]?.name || '',
    state: data?.data?.creator?.state?.[0]?.name || '',
    mobile: data?.data?.creator?.phone || '',
    states: isNigerianLocal ? '' : data?.data?.creator?.states || '',
    cities: isNigerianLocal ? '' : data?.data?.creator?.cities || '',
    bank: data?.data?.bank?.[0]?.bankName || '',
    accountName: data?.data?.bank?.[0]?.accountName || '',
    bank_acc: data?.data?.bank?.[0]?.accountNo || '',
    address: data?.data?.creator?.address || '',
    image: data?.data?.creator?.profile_pic || avatar,
  })
}, [data, countryData, form]) 

  
  // fetch lga first so we have lgaData available before reset
  const { data: lgaData, isLoading: isLoadingLga, error: lgaError, isError: isErrorLga } = useQuery({
    queryKey: ['lga', stateId],
    queryFn: () => getLocalGovernment(stateId),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    enabled: !!stateId,
  })

  const userLga = data?.data.creator?.lga?.[0]?.name
  const country = data?.data.creator?.country        
  const state = data?.data.creator?.state[0]?.name
  const isBankDetails = data?.data?.bank?.[0] !== null
  const isNigerian = countryId == 161


  const queryClient = useQueryClient()
  const {mutate,isPending} = useMutation({
    mutationFn:updateProfileDetails,
    onSuccess:(response)=>{
      queryClient.invalidateQueries(['user-profile',user?.role])
      if(response.status === 200){
         toast("Profile updated successfully", {
            action: {
            label: <X size={16} />,
          },
        })
      }
      if(response.status === 400||response.status === 401){
         toast(response.data?.error||response?.data?.message+' Something weng wrong while processing your request, kindly try again ', {
            action: {
            label: <X size={16} />,
          },
        })
      }
    }
  })
  

  const handleSubmit = async(values) => {
    const data = {
      fname:values.firstName,email:values.email,
      lname:values.lastName,
      phone:values.mobile,address:values.address,
      country:countryId.toString(),
      ...(isNigerian ?{state:stateId.toString()}:{states:values?.states}),
      ...(isNigerian ?{lga:lgaId.toString()}:{cities:values?.cities}),
    }
      mutate({data,user})
      if(!isBankDetails){

        const bankDetails = {
            name: values.accountName,
            bank: values.bank
              ?.split(" ")
              .slice(0, -1)
              .join(" "),
            acno: values.bank_acc,
          };

         await updateBankDetails(bankDetails)
      }
   
  }

  const {mutate:uploadMutation,isPending:isUploadPending} = useMutation({
    mutationFn:async(formData)=>{
     const response = await axios.put(`${isDesigner?'designer':'customer'}/update/profilepic`,formData,{
     headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'multipart/form-data',
      }
   })
   return response
    },
    enabled:!!user,
    onSuccess:(response)=>{
      const newImage = {...user,profile_pic:response?.data?.profile_pic_url}
      Cookies.set('user',JSON.stringify(newImage))
      queryClient.invalidateQueries(['user-profile',user?.role])
      if(response.status === 200){
         toast("Profile image  updated successfully", {
            action: {
            label: <X size={16} />,
          },
        })
      }
    }
  })

  const updateProfilePicture = async(image)=>{
    const formData = new FormData()
    formData.append('pic',image[0])
    uploadMutation(formData)
  }

  const allBanks = data?.data?.bank_codes
  const userBankName = data?.data?.bank?.[0]?.bankName
  
  
  return (
    <div>
      {
        isLoading ? (
         <div className="mt-6">
           <UserProfileLoader/>
         </div>
        ):(

        isError?<ErrorMessage error={error}/>:
        <Form {...form}  className='' data-testid="edit-profile-form">
        <form 
    onSubmit={(e) => {
      e.preventDefault();
      form.handleSubmit(handleSubmit)(e);
    }} 
    className="space-y-5 mt-6 md:mt-10 mb-20 px-4 xl:px-0">
          <div className='flex flex-col md:flex-row justify-between gap-10 md:mb-10'>
            <div className='flex-[0.48]'>
              <div className='relative flex gap-3 items-center md:gap-9 md:items-end'>
                <Indicator className='h-1.5 w-1.5 absolute top-1 left-8 rounded-full md:hidden bg-red-600' />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        {
                          isUploadPending ? <SingleLoader name='circle'/>:<FormLabel htmlFor="upload">
                          <Image src={value ? value :  uploadedImage} className="size-[40px] md:size-[120px] rounded-full" />
                        </FormLabel>
                        }
                        <FormControl>
                          <Input 
                            type='file' 
                            className='hidden' 
                            id="upload"
                            {...field}
                            onChange={(e) => {
                              const files = e.target.files;
                              setUploadedImage(URL.createObjectURL(files[0]))
                              updateProfilePicture(files)
                              onChange(files);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                <div className='relative flex-[1] hidden md:block'>
                  <h1 className='text-2xl mb-10 font-[700]'>Edit profile</h1>
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="text" 
                            className='text-lg shadow-none pl-4 block h-12 text-gray-500 focus-visible:ring-0' 
                            {...field} 
                            data-testid="firstName"
                          />
                        </FormControl>
                        <FormLabel className='absolute left-3 top-[3.5rem] transition-all duration-300 bg-white font-[700]'>
                          First Name
                        </FormLabel>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex gap-5 mt-8 md:hidden'>
                <div className='relative flex-[0.5]'>
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="text" 
                            className='text-lg shadow-none pl-4 block h-12 text-gray-500 focus-visible:ring-0' 
                            {...field} 
                            data-testid="firstName"
                          />
                        </FormControl>
                        <FormLabel className='absolute left-3 -top-4 transition-all duration-300 bg-white font-[700]'>
                          First Name
                        </FormLabel>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='relative flex-[0.5] md:mt-[4.5rem]'>
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="text" 
                            className='text-lg shadow-none pl-4 block h-12 text-gray-500 focus-visible:ring-0' 
                            {...field} 
                            data-testid="lastName" 
                          />
                        </FormControl>
                        <FormLabel className='absolute left-3 -top-4 transition-all duration-300 bg-white font-[700]'>
                          Last Name
                        </FormLabel>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='relative mt-8 md:mt-10'>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          type="email" 
                          className='text-lg shadow-none pl-4 block h-12 text-gray-500 focus-visible:ring-0' 
                          {...field} 
                          data-testid="email"
                        />
                      </FormControl>
                      <FormLabel className='absolute left-3 -top-4 transition-all duration-300 bg-white font-[700]'>
                        Email
                      </FormLabel>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className='relative mt-8 md:mt-10'>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          type="text" 
                          className='text-lg shadow-none pl-4 block h-12 text-gray-500 focus-visible:ring-0' 
                          {...field} 
                          data-testid="address" 
                        />
                      </FormControl>
                      <FormLabel className='absolute left-3 -top-4 transition-all duration-300 bg-white font-[700]'>
                        Address
                      </FormLabel>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              <div className='relative flex-[0.5] mt-8 md:mt-10'>
                  {
                    isNigerian ? 
                    <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className='absolute left-3 -top-2 transition-all duration-300 bg-white font-[700]'>
                          State
                        </FormLabel>
                        <FormControl>
                           <Select
                                value={field.value}
                                defaultValue={field.value}
                                onValueChange={(selectedName) => {
                                field.onChange(selectedName)
                                const id = selectedName?.split(' ')?.slice(-1)[0]
                                if (id) {
                                  setStateId(id)
                                }
                              }}
                              >
                            <SelectTrigger data-testid="state" className="w-full border py-6 rounded-xl">
                              <SelectValue placeholder={state || 'Select State'} />
                            </SelectTrigger>
                              <SelectContent className="bg-white">
                        {isLoadingStates ? (
                           <div data-testid="state-loader">
                                <Skeleton  className="w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                            </div>
                        ) : isErrorState ? (
                          <ErrorMessage error={stateError} />
                        ) : (
                          stateData?.states?.map((state) => (
                            <SelectItem key={state.state_id} value={state.state_name+' '+state.state_id} className="hover:bg-gray-300">
                              {state.state_name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />:  <FormField
                  control={form.control}
                  name="states"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          type="text" 
                          className='text-lg shadow-none pl-4 block h-12 text-gray-500 focus-visible:ring-0' 
                          {...field} 
                          data-testid="states" 
                        />
                      </FormControl>
                      <FormLabel className='absolute left-3 -top-4 transition-all duration-300 bg-white font-[700]'>
                        state
                      </FormLabel>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                  }
                </div>
                    {/* bank details */}
              {
                isDesigner && <div>
                  <div className='relative mt-8 md:mt-10'>
                <FormField
                  control={form.control}
                  name="accountName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          type="text" 
                          disabled={isBankDetails}
                          className='text-lg shadow-none pl-4 block h-12 text-gray-500 disabled:text-gray-800 focus-visible:ring-0' 
                          {...field} 
                          data-testid="accountName" 
                        />
                      </FormControl>
                      <FormLabel className='absolute left-3 -top-4 transition-all duration-300 bg-white font-[700]'>
                        Account Name
                      </FormLabel>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div> 
                 
                </div>
              }
            </div>

            <div className='flex-[0.48] -mt-3.5 md:mt-0 mb-8 md:mb-0'>
              <div className='relative md:mt-[4.5rem] hidden md:block'>
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          type="text" 
                          className='text-lg shadow-none pl-4 block h-12 text-gray-500 focus-visible:ring-0' 
                          {...field} 
                          data-testid="lastName"
                        />
                      </FormControl>
                      <FormLabel className='absolute left-3 -top-4 transition-all duration-300 bg-white font-[700]'>
                        Last Name
                      </FormLabel>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-5 md:block">
                <div className='relative flex-[0.5] md:mt-10'>
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="tel" 
                            className='text-lg shadow-none pl-4 block h-12 text-gray-500 focus-visible:ring-0' 
                            {...field} 
                            data-testid="mobile"
                          />
                        </FormControl>
                        <FormLabel className='absolute left-3 -top-4 transition-all duration-300 bg-white font-[700]'>
                          Mobile No
                        </FormLabel>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='relative flex-[0.5] md:mt-10'>
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className='absolute left-3 -top-2 transition-all duration-300 bg-white font-[700]'>
                          Country
                        </FormLabel>
                        <FormControl>
                           <Select
                                value={field.value}
                                defaultValue={field.value}
                                onValueChange={(selectedName) => {
                                field.onChange(selectedName)
                                const id = selectedName?.split(' ')?.slice(-1)[0]
                                if (id) {
                                  setCountryId(id)
                                }
                              }}
                              >
                            <SelectTrigger data-testid="country" className="w-full border py-6 rounded-xl">
                              <SelectValue placeholder={country || 'Select Country'} />
                            </SelectTrigger>
                            {/* <SelectContent className="bg-white"> */}
                            <SelectContent
  position="popper"
  className="bg-white"
>
                              {isLoadingLga ? (
                                <div data-testid="country-loader">
                                    <Skeleton  className="w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                    <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                    <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                    <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                    <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                </div>
                              ) : isErrorLga ? (
                                <ErrorMessage error={lgaError} />
                              ) : (
                                countryData?.country?.map((country) => (
                                  <SelectItem key={country.country_id} value={`${country.country_name} ${country.country_id}`} className="hover:bg-gray-300">
                                    {country.country_name}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                
              </div>
              
            

          
            <div className="flex gap-5 ">
              

                <div className='relative flex-1 mt-8 '>
                  {
                    isNigerian ? 
                    <FormField
                      control={form.control}
                      name="lga"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className='absolute left-3 top-0 transition-all duration-300 bg-white font-[700]'>
                            L.G.A
                          </FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                                defaultValue={field.value}
                                onValueChange={(selectedName) => {
                                field.onChange(selectedName)
                                const id = selectedName?.split(' ')?.slice(-1)[0]
                                if (id) {
                                  setLgaId(id)
                                }
                              }}
                            >
                              <SelectTrigger data-testid="lga" className="w-full border py-6 rounded-xl">
                                <SelectValue placeholder={userLga || 'Select L.G.A'} />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                {isLoadingLga ? (
                                  <div data-testid="lga-loader">
                                    <Skeleton  className="w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                    <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                    <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                    <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                    <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                </div>
                                ) : isErrorLga ? (
                                  <ErrorMessage error={lgaError} />
                                ) : (
                                 Array.isArray(lgaData)?lgaData?.map((lga) => (
                                    <SelectItem key={lga.id} value={`${lga.name} ${lga.id}`} className="hover:bg-gray-300">
                                      {lga.name}
                                    </SelectItem>
                                  )): <p>Choose state before L.G.A</p>
                                )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />: <FormField
                  control={form.control}
                  name="cities"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          type="text" 
                          className='text-lg shadow-none pl-4 block h-12 text-gray-500 disabled:text-gray-800 focus-visible:ring-0' 
                          {...field} 
                          data-testid="cities" 
                        />
                      </FormControl>
                      <FormLabel className='absolute left-3 -top-4 transition-all duration-300 bg-white font-[700]'>
                        City
                      </FormLabel>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                  }
                </div>
              </div>

              {
                 isDesigner && <div className='relative mt-8 md:mt-10'>
               
                 <FormField
                    control={form.control}
                    name="bank"

                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className='absolute left-3 -top-2 z-10 transition-all duration-300 bg-white font-[700]'>
                           Bank Name
                        </FormLabel>
                        <FormControl>
                           <Select
                                disabled={isBankDetails}
                                value={field.value}
                                defaultValue={field.value}
                                onValueChange={(selectedName) => {
                                field.onChange(selectedName)
                              }}
                              >
                            <SelectTrigger data-testid="state" className="w-full border py-6 rounded-xl">
                              <SelectValue placeholder={userBankName||'Select Bank'} />
                            </SelectTrigger>
                              <SelectContent className="bg-white">
                        {isLoading ? (
                           <div data-testid="bank-loader">
                                <Skeleton  className="w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                            </div>
                        ) : isError ? (
                          <ErrorMessage error={error} />
                        ) : (
                          allBanks?.map((bank) => (
                            <SelectItem key={bank.bank_id} value={bank.bank_name+' '+bank.bank_id} className="hover:bg-gray-300">
                              {bank.bank_name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
              </div>
              }

            </div>
          </div>
          {
            isDesigner && <div className='relative mt-8 md:mt-10'>
                <FormField
                  control={form.control}
                  name="bank_acc"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          type="text" 
                          disabled={isBankDetails}
                          className='text-lg shadow-none w-full pl-4 block h-12 text-gray-500 disabled:text-gray-800 focus-visible:ring-0' 
                          {...field} 
                          data-testid="banck_acc" 
                        />
                      </FormControl>
                      <FormLabel className='absolute left-3 -top-4 transition-all duration-300 bg-white font-[700]'>
                       Account Number
                      </FormLabel>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div> 
          }
            <div className='md:w-[400px] mx-auto'>
              <Button 
                type='submit'
                data-testid="update-btn" 
                className="border border-primary w-full rounded-xl hover:text-white font-[700] text-md bg-white py-6"
              >
                 {isPending ? <span className='flex gap-2 items-center'><Loader2 className='animate-spin size-6 text-primary' /> Updating...</span>: 'Update'}
              </Button>
            </div>

        
        </form>
      </Form>

        )
      }
      
    </div>
  )
}

export default CreatorEditProfileForm

