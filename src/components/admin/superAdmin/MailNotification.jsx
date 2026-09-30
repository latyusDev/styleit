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
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  subject: z.string().min(4,"Enter a valid subject"),
    body: z.string().min(4,"Enter a valid body")
})

const MailNotification = () => {

  const [loading, setLoading] = useState(false)

  

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      body: "",
    },
  })


  const onSubmit = async (data) => {
    try {
      
      setLoading(true)

      const response = await axios.post(
        'mail-notification',
        {subject:data.subject,body:data.body},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      if (response?.status === 200 || response?.status === 201) {

        toast("mail sent successfully", {
          action: {
            label: <X size={16} />,
          },
        })

        form.reset()
      }
  

    } catch (error) {
       toast(error?.response?.data?.error||error?.response?.data?.message, {
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
      <h1 className="text-center font-semibold font-lato">Mail Notification</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Subject</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Enter the subject"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />

              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Body</FormLabel>

                <FormControl>
                    <Textarea className='h-28' placeholder="Enter the message" {...field}/>
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
              : "Send Notification"}
          </Button>

        </form>
      </Form>

    </div>
  )
}

export default MailNotification
