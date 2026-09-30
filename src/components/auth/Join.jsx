import React from 'react'
import { useForm } from 'react-hook-form'
import profile from '../../images/profile-circle.jpg'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { zodResolver } from '@hookform/resolvers/zod'
import { joinSchema } from '@/validations/joinValidation'
import useToggleAuthPage from '@/hooks/useToggleAuthPage'
import { useAuth } from '@/store/useAuth'
import { motion } from 'motion/react'
import AnimatedButton from '../global/AnimatedButton'

const Join = ({page, header}) => {
  const {setRole} = useAuth()
  const {togglePage} = useToggleAuthPage()
    
  const form = useForm({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      join: undefined
    },
  })

  const onSubmit = ({join}) => { 
    togglePage(page, join, true)
    setRole(join)
  }

  return (
    <div className='max-w-[550px] mx-auto mt-20 font-lato px-4'>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className='text-center text-2xl text-primary mb-9'
      >
        {header}
      </motion.h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="join-form">

          <FormField
            control={form.control}
            name="join"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <div className="flex gap-6 md:gap-16 mb-32 md:mb-0 justify-center text-center">

                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                        className="flex-1"
                      >
                        <FormItem className="shadow-md h-full pb-10 pt-9 md:py-6 px-5 relative rounded-3xl md:rounded-xl">
                          <FormControl>
                            <RadioGroupItem value="designer" id="designer" className='border-green-500 absolute top-3 right-3 p-3'/>
                          </FormControl>
                          <FormLabel htmlFor="designer" className="cursor-pointer block w-full">
                            <img src={profile} className='mx-auto max-w-[60px] md:max-w-[110px]' alt="profile"/>
                            <h2 className='mt-7 md:mt-1 text-[1rem] md:text-lg'>Fashion designer</h2>
                          </FormLabel>
                        </FormItem>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                        className="flex-1"
                      >
                        <FormItem className="shadow-md h-full pb-10 pt-9 md:py-6 px-4 md:px-12 rounded-3xl md:rounded-xl relative">
                          <FormControl>
                            <RadioGroupItem value="client" id="client" className='border-green-500 absolute top-3 right-3 p-3'/>
                          </FormControl>
                          <FormLabel htmlFor="client" className="cursor-pointer block w-full">
                            <img src={profile} className='mx-auto max-w-[60px] md:max-w-[110px]' alt="profile"/>
                            <h2 className='mt-7 md:mt-1 text-[1rem] md:text-lg'>Client</h2>
                          </FormLabel>
                        </FormItem>
                      </motion.div>

                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-center text-xl text-red-500" />
              </FormItem>
            )}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            className='mt-32 md:mt-9'
          >
          <AnimatedButton>
              <Button type="submit" data-testid="proceed" className="text-white bg-primary block pb-10 w-full md:w-96 md:mx-auto rounded-lg text-lg">
              Proceed
            </Button>
          </AnimatedButton>
          </motion.div>

        </form>
      </Form>
    </div>
  )
}

export default Join