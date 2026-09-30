import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState, useEffect } from "react"
import m_logo from '@/images/m_logo.png'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


import axios from "axios"
import Cookies from "js-cookie"

import { toast } from "sonner"
import { X } from "lucide-react"
import Image from "@/components/global/Image"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
  otp: z.string().min(4,"Enter a valid otp"),
})

const OtpForm = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  })


  const onSubmit = async (data) => {
    try {
      const transferCode = localStorage.getItem('transferCode')
      
      setLoading(true)

      const response = await axios.post(
        'finalize_transfer',
        {transfer_code:transferCode,otp:data.otp},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      if (response?.status === 200) {

        toast("Fund sent successfully", {
          action: {
            label: <X size={16} />,
          },
        })
        localStorage.removeItem('transferCode')
        form.reset()
        navigate('/admin/creators/awaitingApproval')
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.message}, ${error?.response?.data?.paystack_response?.message} ` || 'something went wrong, try again', {
        action: {
          label: <X size={16} />,
        },
      })

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto shadow-md p-8 border rounded-md mt-20">
    <div className="w-max mx-auto mb-2">
       <Image src={m_logo}/>
     </div>
      <h1 className="text-center font-semibold font-lato">Finalize Transfer</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Otp</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Enter your otp"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />

              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full text-white"
            disabled={loading}
          >
            {loading
              ? "Sending..."
              : "Send Fund"}
          </Button>

        </form>
      </Form>

    </div>
  )
}

export default OtpForm
