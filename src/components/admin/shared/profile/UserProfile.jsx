import Image from '@/components/global/Image';
import React, { memo, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import UserProfileCard from './UserProfileCard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2, X } from 'lucide-react';
import UserProfileLoader from '@/components/global/loaders/ProfileLoaders';
import ErrorMessage from '@/components/global/ErrorMessage';
import { useAdminStore } from '@/store/admin/useAdmin';
import { adminClientEditFormSchema } from '@/validations/clientEditFormValidation';
import { useAuthService } from '@/store/useAuthService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminClientStore } from '@/store/admin/clientStore/useAdminClient';
import { useAdminCreatorStore } from '@/store/admin/creatoreStore/useAdminCreator';
import LastSeen from '../LastSeen';

const UserProfile = ({data,isLoading,isError,error}) => {
      const [section,setSection] = useState({
      businessName:true,
      personalInfo:true,
      address:true, 
    })
    const [stateValue, setStateValue] = useState('')
      const {pathname} = useLocation();
      const isClient = pathname.includes('clients') 
      const [showState, setShowState] = useState(false)

    const {id} = useParams();
    const [stateId, setStateId] = useState(null)
    const [isRequestLoading, setIsRequestLoading] = useState(false)
    const [countryId, setCountryId] = useState()
    const [lgaId, setLgaId] = useState(null)
    const {getLocalGovernment,getCountries,getStates} = useAuthService();
    const {deactivateUser,activateUser} = useAdminStore();
    const {updateClientDetails} = useAdminClientStore();
    const {updateDesignerDetails} = useAdminCreatorStore();
    const selectTriggerRef = useRef(null)
    const isNigerian = countryId == 161

    
    const [currentId,setCurrentId] = useState(null)
      const form = useForm({
          resolver:zodResolver(adminClientEditFormSchema),
          defaultValues:{
            firstName:'',
            lastName:'',
            email:'',
            phoneNumber:'',
            gender:'',
            country:'',
            state:'',
            address:'',
            states:'',
            street:'',
            lga:'',
            picture:'', 
            username: '',
            businessName:''
          }
        })

   
        const userData = isClient ? data?.client : data?.Creator
    
         useEffect(() => {
          let formValues; 
           if(userData){
             const resolvedCountryId = userData?.country_id
            const _stateId = userData?.state_id
            const _lgaId = userData?.lga_id

            setCountryId(resolvedCountryId)
            if (_stateId || _lgaId) {
              setStateId(_stateId)
              setLgaId(_lgaId)
            }
                if(isClient){
                formValues = {
                      firstName:userData?.firstname,
                      lastName:userData?.lastname,
                      email:userData?.email,
                      username:userData?.username,
                      phoneNumber:userData?.phone,
                      gender:userData?.gender,
                      country:userData?.country,
                      address:userData?.address,
                      ...(isNigerian ? {state:userData?.state}:{states:userData?.states}),
                      ...(isNigerian ? {lga:userData?.lga}:{cities:userData?.cities}),
                      picture:userData?.profilePicture,
                }
              }else{
                    formValues = {
                      firstName:userData?.firstname,
                      lastName:userData?.lastname,
                      email:userData?.email,
                      phoneNumber:userData?.phone_no,
                      gender:userData?.gender,
                      businessName:userData?.businessName,
                      country:userData?.Country,
                      address:userData?.address,
                      ...(isNigerian ? {state:userData?.state}:{states:userData?.states}),
                      ...(isNigerian ? {lga:userData?.lga}:{cities:userData?.cities}),
                      picture:userData?.profilePicture,
                }
                }
           }
          form.reset(formValues)
          }, [userData, form])
        
        const handelSection = (id,data)=>{
            setSection(data)
            setCurrentId(id)
        }

    const handleEdit = (e)=>{
        const id = e.currentTarget.dataset.id
        switch(id){
          case 'personal info':
            handelSection(id,{...section,personalInfo:false})
          break;
          case 'address':
            handelSection(id,{...section,address:false})
          break;
          default :
            handelSection(id,{personalInfo:false,address:false})
        }
    }

    const activationData = isClient?{cust_id:id}:{desi_id:id}

    const queryClient = useQueryClient();
    const {data:activation,mutate:accountActivation} = useMutation({
        mutationFn:()=>activateUser(activationData),
        onSuccess:(response)=>{
          
          queryClient.invalidateQueries('single-client')
           if(response.success){
             toast("Account activated successfully", {
                action: {
                label: <X size={16} />,
              },
            })
         }
          
        }
        
    })
    
    const {data:deactivation,mutate:accountDeactivation} = useMutation({
        mutationFn:()=>deactivateUser(activationData),
          onSuccess:(response)=>{
          queryClient.invalidateQueries('single-client')
           if(response.status === 'success'){
             toast("Account deactivated successfully", {
                action: {
                label: <X size={16} />,
              },
            })
         }
          
        }
        
    })

    const handleAccount = (value)=>{
      if(value === 'activate'){
        accountActivation();
      }else{
        accountDeactivation();
      }
    }

    const onSubmit = async(values)=>{
      setIsRequestLoading(true)
         const data = {
          fname:values.firstName,
          email:values.email,
          lname:values.lastName,
          phone:values.phoneNumber,
          address:values.address,
          country:countryId.toString(),
          ...(isClient ?{username:values.username}:{businessname:values.businessName}),
          ...(isNigerian ?{state:stateId.toString()}:{states:values?.states}),
          ...(isNigerian ?{lga:lgaId.toString()}:{cities:values?.cities}),
      }

      try{
          const response = isClient ? await updateClientDetails(data,userData.id) : await updateDesignerDetails(data,userData.id)
          setIsRequestLoading(false)
           toast(response?.message, {
                          action: {
                          label: <X size={16} />,
                        },
                      })
          
      }catch(error){
      setIsRequestLoading(false)
      toast(error?.response?.data?.message||'try again, profile not updated', {
                action: {
                label: <X size={16} />,
              },
            })


      }
    }

    
      
      const isActive = userData?.access =='actived'?true:false

        // fetch lga first so we have lgaData available before reset
  const { data: lgaData, isLoading: isLoadingLga, error: lgaError, isError: isErrorLga } = useQuery({
    queryKey: ['lga', stateId],
    queryFn: () => getLocalGovernment(stateId),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    enabled: !!stateId,
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
        // enabled: isNigeria,
      })

      



  return (
    <div>
      {
        isLoading ? <UserProfileLoader/>:
        isError ? <ErrorMessage error={error} />:
        
  <Form {...form} data-testid="edit-profile-form ">
    <LastSeen lastSeen={userData?.last_seen} />
    
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 px-4 xl:px-0">
          <UserProfileCard name='ff' age={78} cardProps = {{sectionId:'businessName',
            title:userData?.username,currentId,handleEdit}}  >

              <div className='flex items-center gap-4 p-6'>
                <Image src={userData?.profilePic} className="w-[120px] h-[120px] rounded-full" />
                <div>
                      <p className='capitalize'>full name: {isClient?userData?.lastname+' '+userData?.firstname:
                      userData?.lastname+' '+userData?.firstname}  </p>
                      <p className='capitalize'>user: {isClient?'client':'creator'}</p>

                      <p className='capitalize'>status: <span className={`${isActive ? 
                        'text-green-500':'text-red-500'}`}>{userData?.status}</span> </p>

                      <p className='capitalize'>access: <span className={`${ isActive ? 
                        'text-green-500':'text-red-500'}`}>{userData?.access}</span> </p>
              </div>
              </div> 

          </UserProfileCard>

          {/* personal info */}

          <UserProfileCard cardProps = {{sectionId:'personal info',title:'personal info',currentId,handleEdit}} >

                      <div className='flex  flex-col md:flex-row justify-between gap-6 md:gap-10 '>
                        <div className='flex-[0.48]'>
                                        <div className='relative mt-1 md:mt-5'>

                    <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel 
                                      className=' left-3  transition-all duration-300 
                                        font-[700]'>First Name</FormLabel>
                                <Input type="text" id="firstName"   className='capitalize disabled:bg-white font-[500] disabled:text-gray-900 placeholder-gray-400 placeholder:text-[1.07rem]  cursor-pointer text-lg shadow-none pl-3 block h-12 text-white
                                            focus-visible:ring-0' {...field} data-testid="firstName"/>
                                    <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                                />
                      </div>
                      
                        <div className='relative mt-5 '>
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                    <div>
                                    <FormLabel 
                                      className={` left-3   transition-all duration-300 
                                        font-[700]`}>Last Name</FormLabel>
                                      <Input type="text" id="lastName"   className='capitalize mt-2 disabled:bg-white font-[500] disabled:text-gray-900
                                       placeholder-gray-400 placeholder:text-[1.07rem]  cursor-pointer text-lg shadow-none pl-3 block h-12 text-white
                                            focus-visible:ring-0' {...field} data-testid="lastName"/>
                                    </div>
                                      </FormControl>
                                    <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                                />
                      </div>

                        </div>
                      
                        <div className='flex-[0.48]'>

                            <div className='relative mt-1 md:mt-5'>

                    <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel 
                                      className=' left-3  transition-all duration-300 
                                        font-[700]'>Email</FormLabel>
                                <Input type="text" id="email"   className=' disabled:bg-white font-[500] disabled:text-gray-900 placeholder-gray-400 placeholder:text-[1.07rem]  cursor-pointer text-lg shadow-none pl-3 block h-12 text-white
                                            focus-visible:ring-0' {...field} data-testid="email"/>
                                    <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                                />
                      </div>
                      
                        <div className='relative mt-5 '>
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                    <div>
                                    <FormLabel htmlFor='phoneNumber' className={`${form?.formState?.errors?.lastName?.message?' bottom-10':' bottom-3.5'} block bg-white    w-[max-content]  h-[max-content] `}>
                                    </FormLabel>
                                    <FormLabel 
                                      className={` left-3  transition-all duration-300 
                                        font-[700]`}>Phone number</FormLabel>
                                    <Input type="text" id="phoneNumber"   className='capitalize mt-2 disabled:bg-white font-[500] disabled:text-gray-900 placeholder-gray-400 placeholder:text-[1.07rem] cursor-pointer text-lg shadow-none pl-3 block h-12 text-white
                                              focus-visible:ring-0'  {...field} data-testid="phoneNumber" />
                                    </div>
                                      </FormControl>
                                    <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                                />
                      </div>

                        </div>
                      
                      </div>
                      <div className='flex  flex-col md:flex-row justify-between gap-6 md:gap-10 '>

                          {isClient ?
                         

                       <div className='flex-[0.48]  relative md:mt-5'>

                    <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel 
                                      className=' left-3  transition-all duration-300 flex-[0.48] 
                                        font-[700]'>Username</FormLabel>
                                <Input type="text" id="username"  className='capitalize disabled:bg-white font-[500] disabled:text-gray-900 placeholder-gray-400 placeholder:text-[1.07rem]  cursor-pointer text-lg shadow-none pl-3 block h-12 text-white
                                              focus-visible:ring-0' {...field} data-testid="username"/>
                                    <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                                />
                      </div>
                      : 
                      <div className='flex-[0.48]  relative md:mt-5'>

                    <FormField
                          control={form.control}
                          name="businessName"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel 
                                      className=' left-3  transition-all duration-300 flex-[0.48] 
                                        font-[700]'>Business Name</FormLabel>
                                <Input type="text" id="businessName"  className='capitalize disabled:bg-white font-[500] disabled:text-gray-900 placeholder-gray-400 placeholder:text-[1.07rem]  cursor-pointer text-lg shadow-none pl-3 block h-12 text-white
                                              focus-visible:ring-0' {...field} data-testid="businessName"/>
                                    <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                                />
                      </div>
                      
                    }
                            <div className='flex-[0.48]  relative md:mt-5'>

                    <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel 
                                      className=' left-3  transition-all duration-300 flex-[0.48] 
                                        font-[700]'> Gender</FormLabel>
                                <Input type="text" id="gender"  className='capitalize disabled:bg-white font-[500] disabled:text-gray-900 placeholder-gray-400 placeholder:text-[1.07rem]  cursor-pointer text-lg shadow-none pl-3 block h-12 text-white
                                              focus-visible:ring-0' {...field} data-testid="gender"/>
                                    <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                                />
                      </div>
                        </div>
          </UserProfileCard>

        {/* address */}
        <UserProfileCard cardProps = {{sectionId:'address',title:'address',currentId,handleEdit}} >
                              <div className='flex  flex-col md:flex-row justify-between gap-6 md:gap-10 '>
                                      <div className='flex-[0.48]'>
            
                                        <div className='relative mt-1 md:mt-5'>
            
             <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className=' transition-all duration-300  font-[700]'>
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
                            <SelectTrigger data-testid="country" className="w-full border font-[700] py-6 rounded-xl">
                              <SelectValue placeholder={(userData?.country||userData?.Country) || 'Select Country'} />
                            </SelectTrigger>
                            <SelectContent position="popper" className="bg-white">
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
                                  <SelectItem key={country.country_id} value={` ${country.country_id}`} className="hover:bg-gray-300">
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
                                    
                                    <div className='relative mt-5 '>
                                        
                                   {
                                    isNigerian ? 
                                     <>
                                     {
  showState ? <FormField
    control={form.control}
    name="state"
    render={({ field }) => (
      <FormItem className="w-full">
        <FormLabel className=' transition-all duration-300 font-[700]'>
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
            <SelectTrigger ref={selectTriggerRef} data-testid="state" className="w-full text-white border py-6 rounded-xl">
              <SelectValue placeholder={stateValue || 'Select State'} />
            </SelectTrigger>
            <SelectContent position="popper" className="bg-white">
              {isLoadingStates ? (
                <div data-testid="state-loader">
                  <Skeleton className="w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                  <Skeleton className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                  <Skeleton className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                  <Skeleton className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                  <Skeleton className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                </div>
              ) : isErrorState ? (
                <ErrorMessage error={stateError} />
              ) : (
                stateData?.states?.map((state) => (
                  <SelectItem key={state.state_id} value={state.state_name + ' ' + state.state_id} className="hover:bg-gray-300">
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
  /> :
  <div onClick={() => {
    setShowState(true)
    setTimeout(() => {
      selectTriggerRef.current?.click()
    }, 50)
  }} id='state'>
    <h3 className=' font-[700]'>State</h3>
    <p className='capitalize rounded-xl border border-white pt-2 mt-2 font-[500] disabled:text-gray-900 text-lg shadow-none pl-3 block h-12 text-white'>{userData?.state}</p>
  </div>
}
                                     </>
                                        
                                        :
                                          <FormField
                                              control={form.control}
                                              name="states"
                                              render={({ field }) => (
                                                  <FormItem>
                                                    <FormControl>
                                                <div>
                                                <FormLabel 
                                                    className={` left-3 -top-2  transition-all duration-300 
                                                      font-[700]`}>State</FormLabel>
                                                    <Input type="text" id="states"   
                                                    className='capitalize disabled:bg-white font-[500] disabled:text-gray-900 placeholder-gray-400 placeholder:text-[1.07rem] cursor-pointer text-lg shadow-none pl-3 block h-12 text-white
                                                      focus-visible:ring-0'  {...field} data-testid="states" />
                                                </div>
                                                    </FormControl>
                                                  <FormMessage className="text-red-500" />
                                                  </FormItem>
                                              )}
                                              /> 
                                   }
                                    </div>
            
                                      </div>
                                    
                                    
                                      <div className='flex-[0.48]'>
            
                                        <div className='relative mt-1 md:mt-5'>
            
                                  <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                              <FormLabel 
                                                    className=' left-3  transition-all duration-300 
                                                      font-[700]'>Address</FormLabel>
                                              <Input type="text" id="address"  className='capitalize disabled:bg-white font-[500] disabled:text-gray-900 placeholder-gray-400 placeholder:text-[1.07rem]  cursor-pointer text-lg shadow-none pl-3 block h-12 text-white
                                                          focus-visible:ring-0' {...field} data-testid="street"/>
                                                  <FormMessage className="text-red-500" />
                                                  </FormItem>
                                              )}
                                              />
                                    </div>
                                    
                                    <div className='relative mt-5 '>
                                      {
                                        isNigerian ?  
                                        <FormField
                                                            control={form.control}
                                                            name="lga"
                                                            render={({ field }) => (
                                                              <FormItem className="w-full">
                                                                <FormLabel className=' transition-all duration-300 font-[700]'>
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
                                                                    <SelectTrigger data-testid="lga" className="w-full font-[500] border py-6 rounded-xl">
                                                                      <SelectValue placeholder={userData?.lga || 'Select L.G.A'} />
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
                                                          />:
                                                          <div>
                                                  
                                                          <FormField
                                                              control={form.control}
                                                              name="cities"
                                                              render={({ field }) => (
                                                                  <FormItem>
                                                                    <FormControl>
                                                                <div>
                                                                <FormLabel 
                                                                    className={` left-3 -top-2  transition-all duration-300 
                                                                      font-[700]`}>City</FormLabel>
                                                                    <Input type="text" id="cities"   className='capitalize disabled:bg-white font-[500] disabled:text-gray-900 placeholder-gray-400 placeholder:text-[1.07rem] cursor-pointer text-lg shadow-none pl-3 block h-12 text-white
                                                                      focus-visible:ring-0'  {...field} data-testid="cities" />
                                                                </div>
                                                                    </FormControl>
                                                                  <FormMessage className="text-red-500" />
                                                                  </FormItem>
                                                              )}
                                                              />
                                                          </div>
                                      }
                                    </div>
            
                                      </div>
                                  </div>
        </UserProfileCard>
    <div className='capitalize md:flex  md:flex-row gap-4 w-[max-content] mx-auto mt-5'>
      <Button type='button' data-testid='active' disabled={isActive} className={` bg-sidebar mb-2 md:mb-0 w-full md:w-auto  hover:bg-sidebar capitalize text-lightGray px-8 py-6 ${userData?.access ==='actived'?'cursor-not-allowed':'cursor-pointer'}`} onClick={()=>handleAccount('activate')}>activate</Button>
      <Button type='button' data-testid='deactive' disabled={!isActive} className="bg-sidebar mb-2 md:mb-0 w-full md:w-auto hover:bg-sidebar capitalize text-lightGray px-8 py-6" onClick={()=>handleAccount('deactivate')}>deactivate</Button>
      <Button type='submit' className="bg-sidebar mb-2 md:mb-0 w-full md:w-auto hover:bg-sidebar text-lightGray px-8 py-6" >

                                      {
                                        isRequestLoading ? <span className='flex gap-1 items-center'>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                          Submitting...
                                        </span>:'Submit'
                                      }

      </Button>
    </div>
                    </form>
      </Form>
      }
    </div>
  )
}

export default memo(UserProfile)