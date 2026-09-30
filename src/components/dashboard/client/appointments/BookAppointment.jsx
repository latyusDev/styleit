import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PopoverTrigger, Popover, PopoverContent } from '@/components/ui/popover'
import { useForm } from 'react-hook-form'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import Image from '@/components/global/Image'
import calendarImage from '@/images/calendar-2.png'
import { bookAppointmentSchema } from '@/validations/appointmentValidation'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Loader2, X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Indicator from '@/components/global/Indicator'
import CreatorLoader from '@/components/global/loaders/CreatorLoader'
import { useNavigate } from 'react-router-dom'
import TimeInput from '@/components/global/TimeInput'
import { makeAppointment } from '@/api/appointment'
import { useCreatorStore } from '@/store/useCreator'
import { useGlobalStore } from '@/store/global/useGlobal'
import Paginator from '@/components/global/Paginator'
import ErrorMessage from '@/components/global/ErrorMessage'
import { safeDate } from '@/static/data'
import AnimatedButton from '@/components/global/AnimatedButton'

const PAGES_TO_SHOW = 3;

const BookAppointment = () => {
    const [page, setPage] = useState(1)
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const {getDesigners} = useCreatorStore();
    const {searchCreators} = useGlobalStore();
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(bookAppointmentSchema),
    defaultValues: {
      collectionTime: '',
      fullName: '',
      collectionDate: undefined,
      bookingDate: undefined,
      bookingTime: '',
    }
  })


  const { mutate, isPending } = useMutation({
    mutationFn: makeAppointment,
    onSuccess: (response) => {
      if (response?.status === 200) {
        toast("Appointment created successfully", {
          action: { label: <X size={16} /> },
        })
        navigate('/client/appointmentDetails')
      }
    },
    onError: (error) => {
      toast(error?.response?.data?.message || error?.message == 'Network Error'&&'You are offline, check your internet connection', {
        action: { label: <X size={16} /> },
      })
    }
  })

  const onSubmit = (values) => {
    const selectedDesigner = values.fullName.split(' ');
    const bookingData = {
      dsignername: selectedDesigner[selectedDesigner.length - 1],
      // dsignername: 185,
      collectiondate: new Date(safeDate(values.collectionDate)).toLocaleDateString('en-CA'),
      bookingdate: new Date(safeDate(values.bookingDate)).toLocaleDateString('en-CA'),
      bookingtime: values.bookingTime,
      collectiontime: values.collectionTime
    }
    mutate(bookingData)
  }


   const { data, isLoading, error, isError } = useQuery({
                  queryKey: ['available-designers', page, debouncedSearch],
                  queryFn: () => {
                      if (debouncedSearch) {
                          return searchCreators(page, debouncedSearch)
                      }
                      return getDesigners(page)
                  },
                  keepPreviousData: true, // Smooth transitions between pages
                  staleTime: 1000*10*60, // Consider data fresh for 1 mins
              });
  
    
    const designers = data?.designers||data?.results||[]

    const today = new Date().toDateString()

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-6 md:mt-11 mb-20 px-4 xl:px-0">

          {/* Designer Select */}
          <div className='relative'>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="text-lg shadow-none pl-3 h-12 text-gray-500 focus-visible:ring-0">
                        <SelectValue placeholder="Select a designer" />
                      </SelectTrigger>
                      <SelectContent position="popper" className='z-50 bg-white p-4 h-100 overflow-y-scroll '>
                        <div className='mb-8'>
                          <input
                            type='text'
                            value={debouncedSearch}
                            onChange={(e) => setDebouncedSearch(e.target.value)}
                            placeholder='Search for designers'
                            className='focus:shadow-sm placeholder-gray-400 outline-none placeholder:text-[1.07rem] text-lg shadow-md border-1 border-gray-100 w-full rounded-md ring-0 pl-3 block py-4 text-gray-500 focus-visible:ring-0'
                          />
                        </div>
                        {isLoading ? <CreatorLoader /> : 
                        
                        isError ? <ErrorMessage error={error} />: (
                          <div >
                            {designers?.map((designer) => (
                              <SelectItem
                                key={designer.creator_id}
                                value={(designer.creator || designer.first_name+' '+ designer.last_name) + ' ' + (designer.creator_id || designer.id)}
                                className='p-3 relative border shadow-md mt-3 rounded-md'
                              >
                                <div className='flex justify-between items-center'>
                                  <div className='flex items-center gap-3'>
                                    <div>
                                      <Image src={designer.profile_pic} className='w-10 h-10 rounded-full' />
                                    </div>
                                    <div>
                                      <h3 className='capitalize font-[500]'>{designer?.fname || designer?.first_name} {designer?.lname||designer?.last_name}</h3>
                                      <p className='capitalize'>{designer.state} state</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Indicator className='absolute top-4 left-12 h-2 w-2 mt-1.5 md:mt-0 rounded-full bg-green-300 outline outline-1 outline-green-300 outline-offset-2' />
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          
                          </div>
                        )
                        }
                          {designers?.length > 0 && (
                                    <Paginator
                                        data={data}
                                        page={page}
                                        setPage={setPage}
                                        PAGES_TO_SHOW={PAGES_TO_SHOW}
                                    />
                                )}
                                <div className='h-20'></div>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className='flex flex-col md:flex-row justify-between gap-6 md:gap-10 md:mb-10'>

            {/* LEFT COLUMN — Booking Date & Time */}
            <div className='flex-[0.48]'>

              {/* Booking Date */}
              <div className='relative mt-1 md:mt-5'>
                <FormField
                  control={form.control}
                  name="bookingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='absolute left-3  -top-2.5 transition-all duration-300 bg-white font-[700]'>
                        Booking Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("w-full justify-between text-left h-12")}
                            >
                              {field.value ? format(field.value, "PPP") :
                              <span className='text-gray-400 text-sm'>{today}</span>}
                              <Image src={calendarImage} className='h-5 w-5' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={{ before: new Date() }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Booking Time */}
              <FormField
                control={form.control}
                name="bookingTime"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <div className='relative mt-8 md:mt-11'>
                      <FormLabel className='absolute left-3 -top-3 capitalize z-50 text-sm transition-all duration-300 bg-white font-[700]'>
                        booking time
                      </FormLabel>
                      <FormControl>
                        <TimeInput
                          value={field.value}
                          onChange={field.onChange}
                          error={fieldState.error?.message}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* RIGHT COLUMN — Collection Date & Time */}
            <div className='flex-[0.48] mb-6'>

              {/* Collection Date */}
              <div className='relative md:mt-5'>
                <FormField
                  control={form.control}
                  name="collectionDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='absolute -top-2.5 left-3 transition-all duration-300 bg-white font-[700]'>
                        Collection Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("w-full justify-between text-left h-12")}
                            >
                              {field.value ? format(field.value, "PPP") : 
                              <span className='text-gray-400 text-sm'>{today}</span>}
                              <Image src={calendarImage} className='h-5 w-5' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white">
                            <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={{ before: new Date() }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Collection Time */}
              <FormField
                control={form.control}
                name="collectionTime"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <div className='relative w-full mt-8 md:mt-11'>
                      <FormLabel className='absolute left-3 -top-3 capitalize z-10 text-sm transition-all duration-300 bg-white font-[700]'>
                        collection time
                      </FormLabel>
                      <FormControl>
                        <TimeInput
                          value={field.value}
                          onChange={field.onChange}
                          error={fieldState.error?.message}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className='md:w-[500px] mx-auto'>
           <AnimatedButton>
                 <Button
              type="submit"
              className="bg-primary border text-white capitalize border-primary w-full rounded-xl hover:text-primary font-[700] text-md hover:bg-white py-7"
            >
              {isPending ? (
                <span className='flex items-center gap-2'>
                  <Loader2 className='animate-spin' /> processing...
                </span>
              ) : 'make appointment'}
            </Button>
           </AnimatedButton>
          </div>

        </form>
      </Form>
    </div>
  )
}

export default BookAppointment