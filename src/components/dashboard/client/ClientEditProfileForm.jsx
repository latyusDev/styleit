import Image from '@/components/global/Image'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import avatar from '@/images/avatar_profile.png'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Indicator from '@/components/global/Indicator'
import { Link, useLocation } from 'react-router-dom'
import {useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Cookies from 'js-cookie' 
import { designerEditFormSchema } from '@/validations/designerEditFormValidation'
import { clientEditFormSchema } from '@/validations/clientEditFormValidation'
import { toast } from 'sonner'
import { Loader2, X } from 'lucide-react'
import { useAuth } from '@/store/useAuth'
import { useProfileStore } from '@/store/useProfile'
import { useAuthService } from '@/store/useAuthService'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import UserProfileLoader from '@/components/global/loaders/ProfileLoaders'
import ErrorMessage from '@/components/global/ErrorMessage'
import SingleLoader from '@/components/global/loaders/SingleLoader'
import { Skeleton } from '@/components/ui/skeleton'


const ClientEditProfile = ({ title }) => {
  const [uploadedImage, setUploadedImage] = useState(avatar)
  const [stateId, setStateId] = useState(null)
  const [countryId, setCountryId] = useState(null)
  const { user } = useAuth()
  const { getLocalGovernment, getCountries, getStates } = useAuthService()
  const { getProfileDetails, updateProfileDetails } = useProfileStore()
  const isDesigner = user?.role === 'designer'

  const form = useForm({
    resolver: zodResolver(clientEditFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      address: '',
      image: '',
      country: '',
      lga: '',
      state: '',
      cities: '',
      states: '',
    }
  })

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['user-profile', user?.role],
    queryFn: () => getProfileDetails(user),
    enabled: !!user,
    refetchOnWindowFocus: false
  })

  const { data: countryData, isLoading: isLoadingCountries, error: countryError, isError: isErrorCountry } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  })

  const { data: stateData, isLoading: isLoadingStates, error: stateError, isError: isErrorState } = useQuery({
    queryKey: ['states'],
    queryFn: getStates,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  })

  // Set stateId from profile data so LGA query can run
  useEffect(() => {
    const id = data?.data?.customer?.state?.[0]?.id
    if (id) setStateId(String(id))
  }, [data])


  // Set countryId by matching country name against countryData list
  useEffect(() => {
    const customerCountryName = data?.data?.customer?.country
    if (!customerCountryName || !countryData?.country) return
    const matched = countryData.country.find(c => c.country_name === customerCountryName)
    if (matched?.country_id) setCountryId(String(matched.country_id))
  }, [data, countryData]) // depends on both so it re-runs when countries load

  const { data: lgaData, isLoading: isLoadingLga, error: lgaError, isError: isErrorLga } = useQuery({
    queryKey: ['lga', stateId],
    queryFn: () => getLocalGovernment(stateId),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    enabled: !!stateId,
  })

  // Populate form with profile data
  useEffect(() => {
    if (!data?.data) return

    const lgaName = data?.data?.customer?.lga?.[0]?.name || ''
    const matchedLga = lgaData?.find(l => l.name === lgaName)
    const lgaValue = matchedLga ? matchedLga.name : lgaName

    const customerState = data?.data?.customer?.state?.[0]
    const stateValue = customerState ? customerState.name : ''

    const customerCountryName = data?.data?.customer?.country || ''
    const matchedCountry = countryData?.country?.find(c => c.country_name === customerCountryName)
    // value must match SelectItem format: "Nigeria 161"
    const countryValue = matchedCountry
      ? `${matchedCountry.country_name} ${matchedCountry.country_id}`
      : customerCountryName

    form.reset({
      firstName: data?.data?.customer?.fname || '',
      lastName: data?.data?.customer?.lname || '',
      email: data?.data?.customer?.email || '',
      lga: lgaValue,
      cities:data?.data?.customer?.cities||'' ,
      states:data?.data?.customer?.states||'' ,
      state: stateValue,
      country: countryValue,
      mobile: data?.data?.customer?.phone || '',
      address: data?.data?.customer?.address || '',
      image: data?.data?.customer?.profilePic || avatar,
    })
  }, [data, form])

  const userLga = data?.data?.customer?.lga?.[0]?.name
  const country = data?.data?.customer?.country
  const state = data?.data?.customer?.state?.[0]?.name
  const isNigerian = countryId === '161'

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfileDetails,
    onSuccess: (response) => {
      queryClient.invalidateQueries(['user-profile', user?.role])
      if (response.status === 200) {
        toast("Profile updated successfully", { action: { label: <X size={16} /> } })
      }
      if (response.status === 400 || response.status === 401) {
        toast(response.data?.error || response?.data?.message + ' Something went wrong while processing your request, kindly try again', {
          action: { label: <X size={16} /> }
        })
      }
    }
  })

  const handleSubmit = async (values) => {
    const getLga = Array.isArray(lgaData)&& lgaData.find(lga=>lga.name === values.lga)
    const data = {
      fname: values.firstName,
      email: values.email,
      lname: values.lastName,
      ...(isNigerian ? { lga: getLga?.id.toString() } : { cities: values.cities}),
      ...(isNigerian ? { state: stateId } : {states: values.states }),
      phone: values.mobile,
      address: values.address,
      country: countryId
    }
    
    mutate({ data, user })
  }

  const { mutate: uploadMutation, isPending: isUploadPending } = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.put('customer/update/profilepic', formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'multipart/form-data',
        }
      })
      return response
    },
    enabled: !!user,
    onSuccess: (response) => {
      const newImage = { ...user, profile_pic: response?.data?.profile_pic_url }
      Cookies.set('user', JSON.stringify(newImage))
      queryClient.invalidateQueries(['user-profile', user?.role])
      if (response.status === 200) {
        toast("Profile image updated successfully", { action: { label: <X size={16} /> } })
      }
    }
  })

  const updateProfilePicture = async (image) => {
    const formData = new FormData()
    formData.append('pic', image[0])
    uploadMutation(formData)
  }
  

  return (
    <div>
      {isLoading ? (
        <div className="mt-6"><UserProfileLoader /></div>
      ) : isError ? (
        <ErrorMessage error={error} data-testid="error-message"/>
      ) : (
        <Form {...form} className='' data-testid="edit-profile-form">
          <form
            onSubmit={(e) => { e.preventDefault(); form.handleSubmit(handleSubmit)(e) }}
            className="space-y-5 mt-6 md:mt-10 mb-20 px-4 xl:px-0"
          >
            <div className='flex flex-col md:flex-row justify-between gap-10 md:mb-10'>
              <div className='flex-[0.48]'>
                <div className='relative flex gap-3 items-center md:gap-9 md:items-end'>
                  <Indicator className='h-1.5 w-1.5 absolute top-1 left-8 rounded-full md:hidden bg-red-600' />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        {isUploadPending ? <SingleLoader name='circle' /> : (
                          <FormLabel htmlFor="upload">
                            <Image src={value ? value : uploadedImage} className="size-[40px] md:size-[120px] rounded-full" />
                          </FormLabel>
                        )}
                        <FormControl>
                          <Input
                            type='file'
                            className='hidden'
                            id="upload"
                            {...field}
                            onChange={(e) => {
                              const files = e.target.files
                              setUploadedImage(URL.createObjectURL(files[0]))
                              updateProfilePicture(files)
                              onChange(files)
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  

                  <div className='relative flex-[1] hidden md:block'>
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="text" className='text-lg shadow-none pl-4 block h-12 text-gray-500 focus-visible:ring-0' {...field} data-testid="firstName" />
                          </FormControl>
                          <FormLabel className='absolute left-3 -top-2 transition-all duration-300 bg-white font-[700]'>First Name</FormLabel>
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
                            <Input type="text" className='text-lg shadow-none pl-4 block h-12 text-gray-500 focus-visible:ring-0' {...field} data-testid="firstName" />
                          </FormControl>
                          <FormLabel className='absolute left-3 -top-2 transition-all duration-300 bg-white font-[700]'>First Name</FormLabel>
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
                            <Input type="text" className='text-lg shadow-none pl-4 block h-12 text-gray-500 focus-visible:ring-0' {...field} data-testid="lastName" />
                          </FormControl>
                          <FormLabel className='absolute left-3 -top-2 transition-all duration-300 bg-white font-[700]'>
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
                          <Input type="email" className='text-lg shadow-none pl-4 block h-12 text-gray-500 focus-visible:ring-0' {...field} data-testid="email" />
                        </FormControl>
                        <FormLabel className='absolute left-3 -top-2 transition-all duration-300 bg-white font-[700]'>Email</FormLabel>
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
                          <Input type="text" className='text-lg shadow-none pl-4 block h-12 text-gray-500 focus-visible:ring-0' {...field} data-testid="address" />
                        </FormControl>
                        <FormLabel className='absolute left-3 -top-2 transition-all duration-300 bg-white font-[700]'>Address</FormLabel>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='relative flex-[0.5] mt-8 md:mt-10'>
                  {isNigerian ? (
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className='absolute left-3 -top-2 transition-all duration-300 bg-white font-[700]'>State</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              defaultValue={field.value}
                              onValueChange={(selectedName) => {
                                field.onChange(selectedName)
                                // find state id from stateData by name
                                const matched = stateData?.states?.find(s => s.state_name === selectedName)
                                if (matched?.state_id) setStateId(String(matched.state_id))
                              }}
                            >
                              <SelectTrigger data-testid="state" className="w-full border py-6 rounded-xl">
                                <SelectValue placeholder={state || 'Select State'} />
                              </SelectTrigger>
                              <SelectContent position="popper" className="bg-white">
                                {isLoadingStates ? (
                                   <div data-testid="states-loader">
                                      <Skeleton  className="w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                      <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                      <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                      <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                      <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                  </div>
                                ) : isErrorState ? (
                                  <ErrorMessage error={stateError} data-testid="state-error-message" />
                                ) : (
                                  stateData?.states?.map((state) => (
                                    <SelectItem key={state.state_id} value={state.state_name} className="hover:bg-gray-300">
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
                    />
                  ) : (
                    <FormField
                      control={form.control}
                      data-testid="states"
                      name="states"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="text" className='text-lg shadow-none pl-4 block h-12 text-gray-500 focus-visible:ring-0' {...field} data-testid="states" />
                          </FormControl>
                          <FormLabel className='absolute left-3 -top-4 transition-all duration-300 bg-white font-[700]'>State</FormLabel>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>

              <div className='flex-[0.48] -mt-3.5 md:-mt-2 mb-8 md:mb-0'>
                <div className='relative md:mt-[4.5rem] hidden md:block'>
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="text" className='text-lg shadow-none pl-4 block h-12 text-gray-500 focus-visible:ring-0' {...field} data-testid="lastName" />
                        </FormControl>
                        <FormLabel className='absolute left-3 -top-2 transition-all duration-300 bg-white font-[700]'>Last Name</FormLabel>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center gap-5 md:block">
                  <div className='relative flex-[0.5] md:mt-12'>
                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="tel" className='text-lg shadow-none pl-4 block h-12 text-gray-500 focus-visible:ring-0' {...field} data-testid="mobile" />
                          </FormControl>
                          <FormLabel className='absolute left-3 -top-2 transition-all duration-300 bg-white font-[700]'>Mobile No</FormLabel>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='relative flex-[0.5]  md:mt-10'>
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className='absolute left-3 -top-2 transition-all duration-300 bg-white font-[700]'>Country</FormLabel>
                          <FormControl>
                            <Select
                            data-testid="country1"
                              value={field.value}
                              onValueChange={(selectedValue) => {
                                field.onChange(selectedValue)
                                // value format is "Nigeria 161" so last segment is country_id
                                const id = selectedValue?.split(' ')?.slice(-1)?.[0]
                                if (id) setCountryId(id)
                                  form.setValue('cities', '')
                                  form.setValue('states', '')
                              }}
                            >
                              <SelectTrigger data-testid="country" className="w-full border py-6 rounded-xl">
                                <SelectValue placeholder={country || 'Select Country'} />
                              </SelectTrigger>
                              <SelectContent position="popper" className="bg-white">
                                {isLoadingCountries ? (
                                   <div data-testid="country-loader">
                                        <Skeleton  className="w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                        <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                        <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                        <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                        <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                    </div>
                                ) : isErrorCountry ? (
                                  <ErrorMessage error={countryError} data-testid="country-error-message" />
                                ) : (
                                  countryData?.country?.map((country) => (
                                    // value = "Nigeria 161" — name + country_id
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

                <div className="flex gap-5">
                  <div className={`relative flex-1 ${isNigerian ? 'mt-8' : 'mt-10'}`}>
                    {isNigerian ? (
                      <FormField
                        control={form.control}
                        name="lga"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className='absolute left-3 -top-2 transition-all duration-300 bg-white font-[700]'>L.G.A</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger data-testid="lga" className="w-full border py-6 rounded-xl">
                                  <SelectValue placeholder={userLga || 'Select L.G.A'} />
                                </SelectTrigger>
                                <SelectContent position="popper" className="bg-white">
                                  {isLoadingLga ? (
                                     <div data-testid="lga-loader">
                                          <Skeleton  className="w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                          <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                          <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                          <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                          <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                      </div>
                                  ) : isErrorLga ? (
                                    <ErrorMessage error={lgaError} data-testid="lga-error-message" />
                                  ) : (
                                    Array.isArray(lgaData)?lgaData?.map((lga) => (
                                      <SelectItem key={lga.id} value={lga.name} className="hover:bg-gray-300">
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
                      />
                    ) : (
                      <FormField
                      data-testid="cities"
                        control={form.control}
                        name="cities"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="text" className='text-lg shadow-none pl-4 block h-12 text-gray-500 focus-visible:ring-0' {...field} data-testid="cities" />
                            </FormControl>
                            <FormLabel className='absolute left-3 -top-4 transition-all duration-300 bg-white font-[700]'>City</FormLabel>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='md:w-[400px] mx-auto'>
              <Button
                type='submit'
                data-testid="update-btn"
                className="border border-primary w-full rounded-xl hover:text-white font-[700] text-md bg-white py-6"
              >
                {isPending ? <span className='flex gap-2 items-center'><Loader2 className='animate-spin size-6 text-primary' /> Updating...</span> : 'Update'}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export default ClientEditProfile