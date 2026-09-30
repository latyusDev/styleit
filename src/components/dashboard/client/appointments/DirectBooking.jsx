import React, { useEffect, useState } from 'react'
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
import { directBookingSchema } from '@/validations/appointmentValidation'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Loader2, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import TimeInput from '@/components/global/TimeInput'
import { makeAppointment } from '@/api/appointment'
import { safeDate } from '@/static/data'
import AnimatedButton from '@/components/global/AnimatedButton'


const DirectBooking = () => {
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(directBookingSchema),
    defaultValues: {
      collectionTime: '',
      collectionDate: undefined,
      bookingDate: undefined,
      bookingTime: '',
    }
  })

  const selectedDesigner = JSON.parse(localStorage.getItem('selectedDesigner'))||null;


  useEffect(()=>{
    if(!selectedDesigner){
      navigate('/client/bookAppointment')
    }
  },[])
  
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
    const bookingData = {
      dsignername: selectedDesigner?.creator_id||selectedDesigner.id,
      collectiondate: new Date(safeDate(values.collectionDate)).toLocaleDateString('en-CA'),
      bookingdate: new Date(safeDate(values.bookingDate)).toLocaleDateString('en-CA'),
      bookingtime: values.bookingTime,
      collectiontime: values.collectionTime
    }
    mutate(bookingData)
    localStorage.removeItem('selectedDesigner')
  }

    const today = new Date().toDateString()

  return (
    <div>
          <p className='text-center mt-12'>You are booking an appointment with <span className='text-lg font-semibold capitalize'>{selectedDesigner?.lname||selectedDesigner?.last_name} {selectedDesigner?.fname||selectedDesigner?.first_name}</span></p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-3 md:mtf-11 mb-20 px-4 xl:px-0">

          {/* Selected Designer  */}

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
            <div className='flex-[0.48] mb-2'>

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
              ) : `Book ${selectedDesigner?.fname||selectedDesigner?.first_name}`}
            </Button>
           </AnimatedButton>
          </div>

        </form>
      </Form>
    </div>
  )
}

export default DirectBooking