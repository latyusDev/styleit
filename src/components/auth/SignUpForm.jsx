import React, { useState } from 'react'
import african from '../../images/african.png'
import logo from '../../images/logo.png'
import upload from '../../images/upload.png'
import { Form } from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { clientRegisterSchema, designerRegisterSchema } from '@/validations/authValidation'
import Reasons from '@/components/auth/Reasons'
import { Link, useNavigate } from 'react-router-dom'
import Join from '@/components/auth/Join'
import { useAuth } from '@/store/useAuth'
import { Loader2 } from 'lucide-react'
import LevelOneSignUpForm from './LevelOneSignUpForm'
import LevelTwoSignUpForm from './LevelTwoSignUpForm'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthService } from '@/store/useAuthService'
import {motion} from 'motion/react'
import AnimatedButton from '../global/AnimatedButton'
import { toast } from 'sonner'

const SignUpForm = ({ reasons, header }) => {
  const [picture, setPicture] = useState(upload)
  const [level, setLevel] = useState(1)
  const { role } = useAuth()
  const { signUp, isLoading,setIsLoading } = useAuth()
  const navigate = useNavigate()

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = function (result) {
      setPicture(result.target.result)
    }
  }

  const validateUser = role === 'client' ? clientRegisterSchema : designerRegisterSchema

  const form = useForm({
    resolver: zodResolver(validateUser),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      business: '',
      username: '',
      code: '',
      phone: '',
      check: false,
      gender: undefined,
      country: '',
      state: '',
      address: '',
      city: '',
      lga: '',
      nin: '',
      passport: '',
    },
  })

  const { isSignUpForm } = useAuthService((state) => state)

  const handleNext = async () => {
    const level1Fields =
      role === 'client'
        ? ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'username', 'gender', 'image', 'phone']
        : ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'business', 'gender', 'image', 'phone']

    const isValid = await form.trigger(level1Fields)
    if (isValid) setLevel(2)
  }

  const onSubmit = async (values) => {
    const country = values?.country?.split(' ')
    const state = values?.state?.split(' ')
    const lga = values?.lga?.split(' ')

    const countryId = country[country?.length - 1]
    const stateValue = state[state?.length - 1]

    const formData = {
      fname: values.firstName,
      lname: values.lastName,
      email: values.email,
      phone: values.phone,
      pwd: values.password,
      cpwd: values.confirmPassword,
      address: values.address,
      country: countryId,
      gender: values.gender,
      ...(countryId === '161' ? { state: stateValue } : { states: stateValue }),
      lga:  lga[lga?.length-1],
      cities: values.city,
      nin: values.nin,
      passport: values.passport,
      pic: values.image,
      refercode:values.code
    }

    const data = role === 'client' ? { ...formData, username: values.username } :  { ...formData, busname: values.business }
    
      const result = await signUp(data)

    if (result?.status === 201 || result?.status === 200) {
      localStorage.setItem('email',formData.email)
      
      setIsLoading(false)
      navigate('/verifyAccount')
    }
    if (result?.status === 409) {
      form.setError('email', {
        type: 'manual',
        message: 'This email is already registered',
      })
      setLevel(1)
    }
      if (result?.status === 400) {
        toast(result?.data?.message)
        setLevel(2)
    }
  }

  return (
    <section className='md:pl-4 lg:pl-0 overflow-hidden'>
      {isSignUpForm || <Join page="signUp" header="Join us as" />}
      {isSignUpForm && (
        <div className='flex flex-col md:flex-row md:max-w-[800px] mx-auto pt-20 font-lato'>
          <Reasons reasons={reasons} isSignUp={true} image={african} level={level} header={header} />
          <motion.div initial={{opacity:0,x:100}} animate={{x:0,opacity:1,transition:{duration:1}}} className='md:flex-[0.55] px-3 py-4'>
              <Link to='/' className='cursor-pointer'>
                  <img src={logo} className='block mx-auto w-24' alt="" />
              </Link>
            <h2 className='font-[700] mt-7 mb-4 md:mb-2 text-center md:text-left text-xl'>Create an account</h2>
            <p className="text-secondary mb-5 hidden md:block">
              Already have an account?{' '}
              <Link to='/login' className='text-primary capitalize font-[500]'>login</Link>
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {level === 1 && (
                  <LevelOneSignUpForm handleUpload={handleUpload} form={form} picture={picture} />
                )}
                {level === 2 && (
                  <LevelTwoSignUpForm form={form} />
                )}

                <div className='flex gap-4'>
                    
                  {level === 2 && (
                    <div className='w-full md:w-3/4'>
                    <AnimatedButton>
                      <Button
                      type="button"
                      onClick={() => setLevel(level - 1)}
                      className='w-full  text-white rounded-xl text-lg py-6'
                    >
                      Prev
                    </Button>
                  </AnimatedButton>
                  </div>

                  )}
                  <div className='flex w-full'>
                    <AnimatedButton>

                    {level === 1 ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className='w-full text-white rounded-xl text-lg py-6'
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isLoading}
                        data-testid='submit-button'
                        className='w-full text-white rounded-xl text-lg py-6'
                      >
                        {isLoading ? (
                          <span className='flex items-center text-sm gap-2'>
                            <Loader2 className='animate-spin' /> Signing Up
                          </span>
                        ) : (
                          'Submit'
                        )}
                      </Button>
                    )}
                    </AnimatedButton>

                  </div>
                </div>

                <p className="text-secondary mb-5 md:hidden text-center block">
                  Already have an account?{' '}
                  <Link to='/login' className='text-primary capitalize font-[500]'>login</Link>
                </p>
              </form>
            </Form>
        </motion.div>
          </div>
      )}
    </section>
  )
}

export default SignUpForm