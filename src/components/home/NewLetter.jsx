import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Loader2, X } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import newsLetterSchema from '@/validations/newsLetterValidation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import AnimatedButton from '../global/AnimatedButton';
import { motion } from 'motion/react';

const NewLetter = () => {
  const [isLoading,setIsLoading] = useState(false)
   const form = useForm({
      resolver:zodResolver(newsLetterSchema),
      defaultValues:{
          email:'',
          name:''
      }
    })

  const subscribe = async (data) => {
  try {
    setIsLoading(true);

    const response = await axios.post(
      "newsletter/",
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response?.status === 201) {
      toast("You have successfully subscribed to our newsletter");
    }

    if (response?.status === 200) {
      toast("You have already subscribed to our newsletter");
    }
    form.reset()

  } catch (error) {
    toast(error?.response?.data?.message|| error?.response?.data?.error || "An error occurred while subscribing to the newsletter", {
      action: {
        label: <X size={16} />,
      },
    });
  } finally {
    setIsLoading(false);
  }
};

  const handleSubmit = async(values)=>{
    await subscribe(values)
  }

  return (
    <section className="px-5 md:px-0 bg-secondary py-8 md:py-16 font-lato ">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="capitalize text-center text-2xl md:text-4xl text-primary mb-12"
        >
          Subscribe to our newsletter
        </motion.h1>

        <Form {...form} className='max-w-[650px] mx-auto' data-testid="login-form">
          <form onSubmit={form.handleSubmit(handleSubmit)} className='max-w-[650px] mx-auto'>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text"
                        className="w-full pl-8 py-9 bg-white md:py-10 rounded-[1.1rem] placeholder:text-2xl placeholder-secondary" {...field}
                        placeholder="Full name" />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              className='mt-7'
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="email" placeholder="Email"
                        className="w-full pl-8 py-9 bg-white md:py-10 rounded-[1.1rem] placeholder:text-2xl placeholder-secondary" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            >
              <AnimatedButton>
                <Button type="submit" disabled={isLoading} className="w-full mx-auto mt-9 md:mt-12 bg-primary py-9 text-white
                text-[1.4rem] md:font-[700] font-lato rounded-[1.1rem]">
                  {isLoading && <Loader2 className='size-12 animate-spin'/>} Subscribe
                </Button>
              </AnimatedButton>
            </motion.div>

          </form>
        </Form>
    </section>
  )
}

export default NewLetter