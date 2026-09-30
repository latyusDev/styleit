import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import logo from '../../images/logo.png'
import or from '../../images/or.png'
import google from '../../images/devicon_google.png'
import emailIcon from '../../images/mdi-light_email.png' 
import passwordIcon from '../../images/mdi_password-outline.png' 
import Cookies from 'js-cookie'
import {motion} from 'motion/react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { loginSchema } from '@/validations/authValidation'
import Reasons from '@/components/auth/Reasons'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthService } from '../../store/useAuthService'
import Join from '@/components/auth/Join'
import { useAuth } from '@/store/useAuth'
import { Eye, EyeOff, Loader2, X } from 'lucide-react'
import { toast } from 'sonner'
import AnimatedButton from '../global/AnimatedButton'

const LoginForm = ({ reasons, header, image }) => {
  const navigate = useNavigate()
   const [showPassword, setShowPassword] = useState(false);
      
   
   const form = useForm({
     resolver: zodResolver(loginSchema),
     defaultValues: {
       email: '',
       password: ''
      }
    })
    
    const { isLoginForm } = useAuthService()
    const { login, token, user, isLoading, role, error } = useAuth()
    
    const onSubmit = async (values) => {
      const data = {
        email: values.email,
        pwd: values.password
      }
      
      const result = await login(data)
      
      
      if (result?.status === 200 && result?.user?.status === 'actived') {
        toast("Logged in successfully", {
          action: { label: <X size={16} /> },
      })
      return
    }
    
    if (error) {
      form.setError('email', {
        type: 'manual',
        message: error
      })
    }
    if (result?.status === 403 && result?.data?.designer?.status === 'deactived') {
      toast("Kindly verify your account", {
        action: { label: <X size={16} /> },
      })
      Cookies.set('resendToken',result?.data?.token)
      Cookies.set('user',JSON.stringify(result?.data?.designer))
      navigate('/resendVerificationLink')
    }
    if (result?.status === 403 && result?.data?.customer?.status === 'deactived') {
      toast("Kindly verify your account", {
        action: { label: <X size={16} /> },
      })
      Cookies.set('resendToken',result?.data?.token)
      Cookies.set('user',JSON.stringify(result?.data?.customer))
      navigate('/resendVerificationLink')
    }
  }
  
  
  
  const handleShowPassword = () => {
      setShowPassword(!showPassword);
  }
  useEffect(() => {
    if (token && role === 'client' && user?.status === 'actived') {
      navigate('/client/profile')
    }

    if (token && role === 'designer' && user?.status === 'actived') {
      navigate('/creator/profile')
    }
  }, [token, role, user, navigate])

  return (

    <section className='md:pl-4 lg:pl-0 overflow-hidden'>
        {!isLoginForm? <Join page="login" header="Log in as"/> :<div className='flex flex-col md:flex-row max-w-[900px] mx-auto  pt-20'>
        <Reasons reasons={reasons} image={image} isSignUp={false} header={header}/>

        <motion.div initial={{opacity:0,x:100}} animate={{x:0,opacity:1,transition:{duration:1}}} className='flex-[0.5] px-4 md:px-12 flex flex-col md:flex-col'>
            <div className='text-center  md:hidden'>
                <Link to='/' className='cursor-pointer'>
                    <img src={logo} className='block mx-auto' alt="" />
                </Link>
                <h2 className='font-[500] font-lato text-xl mt-8 mb-12'>Login to your account</h2>
            </div>
            <div className='font-lato  text-lg text-center md:text-left hidden md:block'>
                <Link to='/' className='cursor-pointer'>
                    <img src={logo} className='block mx-auto' alt="" />
                  </Link>
                <h2 className='font-[500] font-lato mt-8 mb-2'>Login to your account</h2>
                <p className="font-lato">Don't have an account ? <Link to='/signUp' className='text-primary capitalize font-[500]'>sign up</Link></p>
                <div className='flex justify-center items-center gap-2 py-3 rounded-md w-full mt-4 shadow-[0px_1px_2px_0px_#FF617C4D] px-7 '>
                    <img src={google} className='w-[30px]' alt="" />
                    <p>Continue with google</p>
                </div>
                    <img src={or} className='w-[100px] block mx-auto my-5' alt="" />

            </div>
             
                <Form {...form} className='flex-[0.5]' data-testid="login-form">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className='relative'>
                    <img src={emailIcon} className='absolute top-5 left-4 w-[20px] h-[20px]' alt="" />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Input type="email" placeholder="Enter email" className="text-lg border border-secondary  placeholder:font-lato placeholder-secondary pl-12 py-7 rounded-xl outline-[0]" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                            />
                  </div>
                  <div className='relative'>
                    <img src={passwordIcon} className='absolute top-5 left-4 w-[20px] h-[20px]' alt="" />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                   <div className='relative'>
                                        {
                                      showPassword ? <EyeOff
                                        onClick={handleShowPassword} 
                                        className="absolute z-20  cursor-pointer right-3  top-4 text-gray-400 " 
                                      />: <Eye
                                        onClick={handleShowPassword} 
                                        className="absolute z-20 cursor-pointer right-3  top-4 text-gray-400" 
                                      />
                                      }
                                    <Input type={showPassword?"text":"password"}  
                                    placeholder="Enter password" className="text-lg border border-secondary  placeholder:font-lato placeholder-secondary pl-12 py-7 rounded-xl outline-[0]" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                            />
                  </div>

                        
                    <AnimatedButton>
                            <Button type="submit" disabled={isLoading} className='w-full text-white rounded-xl text-lg py-6'>
                        {isLoading?<Loader2 className='animate-spin' />:'Login'} 
                        </Button>
                    </AnimatedButton>
                         <p className=' text-center '>
                            <Link to={'/user/forgottenPassword'} className=' text-primary hover:underline'>Forgot Password</Link>
                         </p>
                </form>
            </Form>
            <div className='text-center md:hidden'>
                    <span className='text-center my-4 block'>OR</span>
                <div className='flex justify-center items-center gap-2 py-3 rounded-md w-full mt-4 shadow-[0px_1px_2px_0px_#FF617C4D] px-7 '>
                    <img src={google} className='w-[30px]' alt="" />
                    <p>Continue with google</p>
                </div>
            <p className="font-lato mt-8">Don't have an account ? <Link to='/signUp' className='text-primary capitalize font-[500]'>sign up</Link></p>
            </div>
         </motion.div>
    </div>
        }
    </section>
  )
}



export default LoginForm