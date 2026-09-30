import axios from 'axios'
import Cookies from 'js-cookie'
import { Loader2, X } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'

const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
})

const NinEmailForm = ({serverState,setServerState}) => {
  const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
      },
    })

     const onSubmit = async (data) => {
    try {

      setServerState({...serverState,isLoading:true})

      const response = await axios.post('klmg',
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (response?.data?.error) {
      setServerState({...serverState,isLoading:false})
        toast(response?.data?.error, {
          action: {
            label: <X size={16} />,
          },
        })
      }
      if (response?.status === 200 || response?.status === 201 ) {
        Cookies.set('ninToken',response?.data?.access_token)
      setServerState({...serverState,isReady:true,isLoading:false})
        toast("Upload your nin slip", {
          action: {
            label: <X size={16} />,
          },
        })
      }

    } catch (error) {
      toast.error("Something went wrong. Try again.")

    } 
  }
  return (
    <div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>

                <FormLabel className='my-4 block'>Fill in your email to have access to upload NIN slip/card</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-red-500 text-left" />

              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full text-white"
            disabled={serverState.isLoading}
          >
            {serverState.isLoading
              ? <span className="flex gap-2 items-center"><Loader2 className="animate-spin" />  Submitting...</span>
              : "Submit"}
          </Button>

        </form>
      </Form>
    </div>
  )
}

export default NinEmailForm