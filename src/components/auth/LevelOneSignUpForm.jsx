import React, { useState } from 'react'
import emailIcon from '../../images/mdi-light_email.png' 
import passwordIcon from '../../images/mdi_password-outline.png' 
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useAuth } from '@/store/useAuth';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Eye, EyeOff } from 'lucide-react';

const LevelOneSignUpForm = ({handleUpload,form,picture}) => {
    const {role} = useAuth();
    const isClient = role === 'client' 
    const [showPassword, setShowPassword] = useState({password:false,confirmPassword:false});
    
      const handleShowPassword = (value) => {
        if(value === 'password'){
          setShowPassword({...showPassword,password:!showPassword.password});
        }else{
          setShowPassword({...showPassword,confirmPassword:!showPassword.confirmPassword});

        }
      }

  return (
    <div>
      <div className="flex flex-col md:flex-row  gap-4 md:gap-2 mb-4">
        <div className='flex-[0.5]'>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input data-testid="firstName-input" type="text" placeholder="First name" className="text-lg border border-secondary  placeholder-secondary pl-4 py-6 rounded-xl outline-[0]" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <div className='flex-[0.5]'>
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input data-testid="lastName-input" type="text" placeholder="Last name" className="text-lg border border-secondary  placeholder-secondary pl-4 py-6 rounded-xl outline-[0]" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className='relative'>
        <img src={emailIcon} className='absolute top-4 left-4 w-[20px] h-[20px]' alt="" />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input data-testid="email-input" type="email" placeholder="Enter email" className="text-lg border border-secondary  placeholder-secondary pl-12 py-6 rounded-xl outline-[0]" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      </div>

      <div className="flex  flex-col gap-4  my-4">
        <div className='relative '>
          <img src={passwordIcon} className='absolute top-4 left-4 w-[20px] h-[20px]' alt="" />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl> 
                     {/* ✅ Eye toggle */}
                    <div className='relative'>
                         {
                        showPassword.password ? <EyeOff
                          onClick={()=>handleShowPassword('password')} 
                          className="absolute z-20  cursor-pointer right-3  top-3.5 size-5 text-gray-400 " 
                        />: <Eye
                          onClick={()=>handleShowPassword('password')} 
                          className="absolute z-20 cursor-pointer right-3  top-3.5 size-5 text-gray-400" 
                        />
                       }
                  <Input data-testid="password-input" type={showPassword.password?"text":"password"} 
                  placeholder="Enter password" className="text-lg border border-secondary
                    placeholder-secondary pl-12 py-6 rounded-xl outline-[0]" {...field} />
                    </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <div className='relative '>
          <img src={passwordIcon} className='absolute top-4 left-4 w-[20px] h-[20px]' alt="" />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                     {/* ✅ Eye toggle */}
                    <div className='relative'>
                         {
                        showPassword.confirmPassword ? <EyeOff
                          onClick={()=>handleShowPassword('confirmPassword')} 
                          className="absolute z-20 bg-white cursor-pointer right-3 top-3.5 size-5 text-gray-400 " 
                        />: <Eye
                          onClick={()=>handleShowPassword('confirmPassword')} 
                          className="absolute z-20 cursor-pointer right-3 top-3.5 size-5 text-gray-400" 
                        />
                       }
                  <Input data-testid="confirmPassword-input" type={showPassword.confirmPassword?"text":"password"}  placeholder="Confirm password" className="text-lg border border-secondary  placeholder-secondary pl-12 py-6 rounded-xl outline-[0]" {...field} />
                    </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div>
        {
          isClient ?  
          <div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input data-testid="username-input" type="text" placeholder="Enter Username" className="w-full text-lg border border-secondary  placeholder-secondary pl-4 py-6 rounded-xl outline-[0]" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          :
          <div className='w-full'>
            <FormField
              control={form.control}
              name="business"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input data-testid="business-input" type="text" placeholder="Business name" className="w-full text-lg border border-secondary  placeholder-secondary pl-4 py-6 rounded-xl outline-[0]" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
        }
      </div>

      <div className='md:self-center flex-[0.5] mt-4'>
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-fcol space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem data-testid="male-radio" value="Male" id="male" className='border-green-500'/>
                    </FormControl>
                    <FormLabel htmlFor="male" className="font-normal">
                      Male
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem data-testid="female-radio" value="Female" id="female" className="border-green-500" />
                    </FormControl>
                    <FormLabel htmlFor="female" className="font-normal">
                      Female
                    </FormLabel>
                  </FormItem>

                </RadioGroup>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="image" 
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className='flex items-center gap-3 mt-4'>
                <label htmlFor="file" className='block'>
                  <img src={picture} alt="Upload Icon" className='w-[100px] h-[100px] cursor-pointer rounded-full' />
                </label>
                <div>
                  <label>Profile image</label>
                  <p className='text-primary text-sm'>Supports only [jpg, gif, png]</p>
                </div>

                <Input 
                  type="file"
                  id="file"
                  data-testid="file-input"
                  className='hidden'
                  accept=".jpg,.jpeg,.gif,.png"
                  onChange={(e) => {
                    field.onChange(e.target.files);
                    handleUpload(e)
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </div>
            </FormControl>
            <FormMessage className="text-red-500"/> 
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input data-testid="phone-input" type="tel" placeholder="Active phone number" className="text-lg border border-secondary  placeholder-secondary pl-4 py-6 rounded-xl mt-4 outline-[0]" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    </div>
  )
}

export default LevelOneSignUpForm