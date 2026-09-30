import { Button } from '@/components/ui/button'
import { subscriptions } from '@/static/data'
import React, { useState } from 'react'
import SubscriptionCard from './SubscriptionCard';
import {  useParams } from 'react-router-dom';
import { CreditCard, Loader, X } from 'lucide-react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/store/useAuth';
import SubscriptionHeader from './SubscriptionHeader';


const  ProceedSubscription = () => {
    const {id} = useParams();
    const [isPending,setIsPending] = useState(false);
    const {user} = useAuth();

    const singleSubscription = subscriptions.find(subscription=>subscription.id == id);
    const refno = localStorage.getItem('refno');

    if(singleSubscription == undefined){
        return(
            <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                <CreditCard className="w-12 h-12 text-slate-300 mb-4" />
                <p className="text-slate-500">Subsription is currently not available</p>
                </CardContent>
            </Card>
        )
              
    }

    const proceed = async()=>{
          setIsPending(true)
             try{
                  const response = await axios.post(`payment`,{refno},{
              headers: {
                     Authorization: `Bearer ${Cookies.get('token')}`,
                     'Content-Type': 'application/json',
                     Accept:'application/json'
            }
          })
           if(response.status === 200){
            localStorage.removeItem('refno')
            setIsPending(false)
            window.location.href = `${response?.data.authorization_url}`
          }
            return response
             }catch(e){
                if(e?.status === 500){
                    setIsPending(false)
                    toast("Message",{
                        description:<p className='text-white'>{e?.response?.data.message}</p>,
                        action: {
                        label: <X size={16} />,
                    },
                })
    }
             }finally{
                setIsPending(false)

             }
    }
    const date = new Date().toLocaleDateString();

  return (
        <section  className='container font-lato md:pt-16   pb-32 px-4 xl:px-0'>
            <div className='text-center pt-7 font-lato'>
                <SubscriptionHeader/>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className='flex flex-col md:flex-row gap-6 md:gap-12 basis-[50%]'>
                        <div className='mt-6 md:mt-0'>
                            <p className='capitalize font-[700] '>full name:<span className='ml-3 md:ml-0 font-[500]'>{user.last_name} {user.first_name}</span></p>
                            <p className='capitalize mt-2 font-[700] '>payment date:<span className='ml-3 md:ml-0 font-[500]'>{date}</span></p>
                            <p className='capitalize mt-2 font-[700] '>amount :<span className='ml-3 md:ml-0 font-[500]'>{singleSubscription.amount}.00</span></p>
                        </div>
                        <div>
                            <p className='capitalize font-[700] '>Business name:<span className='ml-3 md:ml-0 font-[500]'>{user.businessName}</span></p>
                            <p className='capitalize mt-2 font-[700] '>payment reference:<span className='ml-3 md:ml-0 font-[500]'>{refno}</span></p>
                            <p className='capitalize mt-2 font-[700] '>payment status:<span className='ml-3 md:ml-0 font-[500]'>pending</span></p>
                        </div>
                    </div>
                    <div className='hidden md:block basis-[30%]'>
                        <SubscriptionCard 
                        proceed={proceed}
                        subscription={singleSubscription}   btnContent="Pay now"
                        subscriptions={subscriptions} isShow={true}/>
                    </div>
                    <Button disabled={isPending} onClick={proceed} className='md:hidden capitalize blodck  text-lg px-0 py-6 rounded-xl  border border-primary 
                    w-full mt-16 md:mt-9 bg-[#FF617C] text-center text-white hover:bg-[#ffffff] hover:text-[#FF617C]'>
                        {isPending?<span className="flex items-center justify-center gap-2"><Loader className='animate-spin'/> processing...</span>:'Pay now'}</Button>
            </div>
        </section>
  )
}

export default  ProceedSubscription