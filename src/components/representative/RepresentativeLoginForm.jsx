
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Eye, EyeOff, X } from "lucide-react"

import m_logo from "@/images/m_logo.png"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "@/components/global/Image"
import { loginSchema } from "@/validations/authValidation"
import { useAuth } from "@/store/useAuth"



const RepresentativeLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const {login,error,isLoading,role,setRole} = useAuth()
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

    useEffect(()=>{
      setRole('representative')
    },[])
  

  const onSubmit = async (data) => {
    const formData = {
        email: data.email,
        pwd: data.password
      }
    try {
      const response = await login(formData)
        if (response?.status == 401) {
          toast(response?.data?.message, {
              action: {
              label: <X size={16} />,
            },
          })
      }
    if (response?.status === 200) {
        toast("Log in successfully", {
            action: {
            label: <X size={16} />,
          },
        })
        navigate('/representative/profile')

    }
    } catch (error) {
      toast.error(error?.response?.data?.message||error?.message)
    } 
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md border">

        {/* Logo */}
        <Image src={m_logo} className="mx-auto mb-4" />

        {/* Title */}
        <h1 className="text-center text-xl font-semibold mb-6">
          Representative Login
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter email"
                      className="border border-secondary py-6 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                  {error&&<p className="text-red-500 text-sm">{error}</p>}
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className="border border-secondary py-6 rounded-xl pr-12"
                      />

                      {/* Eye Icon */}
                      <span
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Forgot Password */}
            <p className="text-right text-sm">
              <Link to="/user/forgottenPassword" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </p>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full text-white py-6 rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            {/* Signup Link */}
            <p className="text-center text-sm">
              Don’t have an account?{" "}
              <Link to="/representativeSignup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>

          </form>
        </Form>
      </div>
    </div>
  )
}

export default RepresentativeLoginForm
