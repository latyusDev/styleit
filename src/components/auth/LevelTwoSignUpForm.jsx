import React, { useState } from 'react'
import emailIcon from '../../images/mdi-light_email.png'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Checkbox } from '../ui/checkbox'
import { Link } from 'react-router-dom'
import { ParkingSquare } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import ErrorMessage from '../global/ErrorMessage'
import { useAuthService } from '@/store/useAuthService'
import { Skeleton } from '../ui/skeleton'

const LevelTwoSignUpForm = ({ form }) => {
  const [stateId, setStateId] = useState(null)
  const { getCountries, getStates, getLocalGovernment } = useAuthService()

  const selectedCountry = form.watch('country')?.split(' ')
  const getCountryId = selectedCountry[selectedCountry?.length-1]
  const isNigeria = getCountryId == '161'

  const { data, isLoading, error, isError } = useQuery({
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
    enabled: isNigeria,
  })

  const { data: lgaData, isLoading: isLoadingLga, error: lgaError, isError: isErrorLga } = useQuery({
    queryKey: ['lga', stateId],
    queryFn: () => getLocalGovernment(stateId),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    enabled: !!stateId,
  })

  return (
    <div>
      {/* Country & State Row */}
      <div className='flex items-start my-4 flex-col md:flex-row gap-2'>

        {/* Country */}
        <div className='w-full md:w-auto flex-[0.5]'>
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <SelectTrigger data-testid="country" className="w-full md:w-[193px] border border-secondary py-6 rounded-xl">
                      <SelectValue placeholder="Choose country" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-white">
                      {isLoading ? (
                           <div data-testid="loader">
                                    <Skeleton  className="w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                    <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                    <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                    <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                    <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                          </div>
                      ) : isError ? (
                        <ErrorMessage error={error} />
                      ) : (
                        data?.country?.map((country) => (
                          <SelectItem key={country.country_id} value={country.country_name+' '+country.country_id} className="hover:bg-gray-300">
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

        {/* State — dropdown for Nigeria, text input otherwise */}
        {isNigeria ? (
          <div className='w-full md:w-auto flex-[0.5]'>
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Select
                      value={field.value}
                      defaultValue={field.value}
                      onValueChange={(selectedName) => {
                      field.onChange(selectedName)
                      const id = selectedName?.split(' ')?.slice(-1)
                      if (id) {
                        setStateId(id)
                      }
                    }}
                    >
                      <SelectTrigger data-testid="state" className="w-full md:w-[193px] border border-secondary py-6 rounded-xl">
                        <SelectValue placeholder="Choose state" />
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
            />
          </div>
        ) : (
          <div className='w-full md:w-auto md:flex-[0.5]'>
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="State"
                      className="w-full md:w-auto text-lg border border-secondary placeholder-secondary pl-4 py-6 rounded-xl outline-[0]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-2 my-4">

        {/* Address */}
        <div className='w-full md:w-auto md:flex-[0.5]'>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Address"
                    className="w-full md:w-auto text-lg border border-secondary placeholder-secondary pl-4 py-6 rounded-xl outline-[0]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        {isNigeria ? (
          <div className='w-full md:w-auto flex-[0.5]'>
            <FormField
              control={form.control}
              name="lga"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Select
                      value={field.value}
                      defaultValue={field.value}
                      onValueChange={(selectedName) => {
                        field.onChange(selectedName)
                      }}
                    >
                      <SelectTrigger data-testid="lga" className="w-full md:w-[193px] border border-secondary py-6 rounded-xl">
                        <SelectValue placeholder="Choose LGA" />
                      </SelectTrigger>
                      <SelectContent position="popper" className="bg-white">
                         {isLoadingLga ? (
                             <div data-testid="states-loader">
                                    <Skeleton  className="w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                    <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                    <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                    <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                    <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                          </div>
                        ) : isErrorLga ? (
                          <ErrorMessage error={lgaError} />
                        ) : (
                          lgaData?.map((lga) => (
                            <SelectItem key={lga.id} value={lga.name+' '+lga.id} className="hover:bg-gray-300">
                              {lga.name}
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
        ) : (
          <div className='w-full md:w-auto md:flex-[0.5]'>
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="City"
                      className="w-full md:w-auto text-lg border border-secondary placeholder-secondary pl-4 py-6 rounded-xl outline-[0]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>

      {/* NIN & Passport */}
      <div className='flex gap-2 justify-center items-start'>

        {/* NIN */}
        <div className='relative flex-[0.5]'>
          <img src={emailIcon} className='absolute top-4 left-4 w-[20px] h-[20px]' alt="" />
          <FormField
            control={form.control}
            name="nin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="NIN"
                    className="text-lg border border-secondary placeholder-secondary pl-12 py-6 rounded-xl outline-[0]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        {/* Passport */}
        <div className='relative flex-[0.5]'>
          <ParkingSquare className='absolute text-gray-400 text-sm top-4 left-4 w-[20px] h-[20px]' />
          <FormField
            control={form.control}
            name="passport"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Passport"
                    className="text-lg border border-secondary placeholder-secondary pl-12 py-6 rounded-xl outline-[0]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Referral Code */}
      <FormField
        control={form.control}
        name="code"
        render={({ field }) => (
          <FormItem className='mt-4'>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter referral code"
                className="text-lg border border-secondary placeholder-secondary pl-4 py-6 rounded-xl outline-[0]"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      {/* Terms & Conditions */}
      <FormField
        control={form.control}
        name="check"
        render={({ field }) => (
          <FormItem className='mt-4'>
            <div className="flex items-start space-x-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                id="check"
                className="border-green-500 w-5 h-5"
              />
              <label htmlFor="check" className="text-[0.8rem]">
                By checking the box on the left, you agree to the website{' '}
                <Link className='text-primary'>terms and condition</Link>
              </label>
            </div>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    </div>
  )
}

export default LevelTwoSignUpForm