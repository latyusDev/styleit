import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState, useEffect } from "react"

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

import PasswordHeader from "./PasswordHeader"

import axios from "axios"
import Cookies from "js-cookie"

import { toast } from "sonner"
import { X } from "lucide-react"
import { useLocation } from "react-router-dom"

const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
})

const ForgottenPassword = () => {

  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0);
  const location = useLocation();
   const [showPassword, setShowPassword] = useState(false);
        
   
   const isAdmin = location?.pathname.split('/')[1] === 'admin';
   
   
   const form = useForm({
     resolver: zodResolver(formSchema),
     defaultValues: {
       email: "",
      },
    })
    
    // countdown timer
    useEffect(() => {
      let timer
      
      if (countdown > 0) {
        timer = setInterval(() => {
          setCountdown((prev) => prev - 1)
        }, 1000)
      }

      return () => clearInterval(timer)
    }, [countdown])
    
    const onSubmit = async (data) => {
      try {
        
        setLoading(true)
        
        const response = await axios.post(
        `${isAdmin?'admin/':''}forgot-password`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (response?.status === 200) {
        
        toast("Password reset link has been sent to your email", {
          action: {
            label: <X size={16} />,
          },
        })

        setCountdown(60) // start 60s timer
        form.reset()
      }

    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong. Try again.")
      
    } finally {
      setLoading(false)
    }
  }
  
  const handleShowPassword = () => {
      setShowPassword(!showPassword);
  }
  return (
    <div className="max-w-xl mx-auto shadow-md p-8 border rounded-md">

      <PasswordHeader title={"Forgot Password"} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Enter your email"
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
            disabled={loading || countdown > 0}
          >
            {loading
              ? "Sending..."
              : countdown > 0
              ? `Resend in ${countdown}s`
              : "Send Reset Link"}
          </Button>

        </form>
      </Form>

    </div>
  )
}

export default ForgottenPassword