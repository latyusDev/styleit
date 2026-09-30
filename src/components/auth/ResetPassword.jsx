import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
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
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Cookies from "js-cookie"
import axios from "axios"
import { toast } from "sonner"
import { Eye, EyeOff, X } from "lucide-react"


const formSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })


const ResetPassword = () => {
  const {token} = useParams();
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false)
  const location = useLocation();
   const [showPassword, setShowPassword] = useState({password:false,confirmPassword:false});
      
        

  useEffect(()=>{
    if(token){
      Cookies.set('resetToken',token)
    }
  },[token])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })
  const isAdmin = location?.pathname.startsWith("/admin")

  const onSubmit = async(values)=>{
    setIsLoading(true)
     try {
        const response = await axios.post(
          `${isAdmin?'admin/':''}reset-password/${token}`,
          {pwd:values.password,cpwd:values.confirmPassword}
        )
        
        if(response?.status === 200 ){
           toast("Password reset successfully", {
                action: {
                label: <X size={16} />,
              },
            })
          Cookies.remove('resetToken')
            const getRedirection = isAdmin ? '/admin/login':'/login'
            navigate(getRedirection)
        }
      } catch (error) {
  toast(
    error?.response?.data?.message ||
    "Something went wrong",
    {
      action: {
        label: <X size={16} />,
      },
    }
  );
}finally{
        setIsLoading(false)
      }

  }

  const handleShowPassword = (value) => {
          if(value === 'password'){
            setShowPassword({...showPassword,password:!showPassword.password});
          }else{
            setShowPassword({...showPassword,confirmPassword:!showPassword.confirmPassword});
  
          }
        }

  return (
    <div className="max-w-xl mx-auto  shadow-md p-8 border">

    <PasswordHeader title={'Reset Password'}/>


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>

                <FormLabel>New Password</FormLabel>

                <FormControl>
                   <div className='relative'>
                         {
                        showPassword.password ? <EyeOff
                          onClick={()=>handleShowPassword('password')} 
                          className="absolute z-20  cursor-pointer right-3  top-2 size-5 text-gray-400 " 
                        />: <Eye
                          onClick={()=>handleShowPassword('password')} 
                          className="absolute z-20 cursor-pointer right-3  top-2 size-5 text-gray-400" 
                        />
                       }
                  <Input data-testid='new-password' type={showPassword.password?"text":"password"}  {...field} />
                    </div>
                </FormControl>

                <FormMessage className='text-red-500'/>

              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Confirm Password</FormLabel>

                <FormControl>
                  <div className="relative">
                         {
                        showPassword.confirmPassword ? <EyeOff
                          onClick={()=>handleShowPassword('confirmPassword')} 
                          className="absolute z-20  cursor-pointer right-3  top-2 size-5 text-gray-400 " 
                        />: <div>
                          <Eye
                          onClick={()=>handleShowPassword('confirmPassword')} 
                          className="absolute z-20 cursor-pointer right-3  top-2 size-5 text-gray-400" 
                        />
                        </div>
                       }
                  <Input data-testid='confirm-password' type={showPassword.confirmPassword?"text":"password"}  {...field} />
                    </div>
                </FormControl>

                <FormMessage className='text-red-500' />

              </FormItem>
            )}
          />

          <Button disabled={isLoading} type="submit" className="w-full text-white">
            {isLoading ?'Resetting Password':'Reset Password'}
          </Button>

        </form>
      </Form>

    </div>
  )
}

export default ResetPassword 