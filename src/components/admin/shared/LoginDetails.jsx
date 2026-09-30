import ErrorMessage from '@/components/global/ErrorMessage'
import UserProfileLoader from '@/components/global/loaders/ProfileLoaders'
import { ActivitySquareIcon } from 'lucide-react'
import React from 'react'
import { useLocation } from 'react-router-dom'

const LoginDetails  = ({isLoading,creator,isError,error}) => {
    const location = useLocation()
    const isCreator = location?.pathname.includes('creator')
    
    
  return (
   <>
   
   {
    isCreator && <h1 className='mb-5'>Business Name : {creator?.businessName}</h1>
   }
    
        {
            isLoading ? <UserProfileLoader/>:
            isError ? <ErrorMessage error={error}/>:
             <div data-testid='login-details' className='flex flex-col md:flex-row gap-4 font-lato'>
                <div className={`basis-[30%] lg:basis-[40%] xl:basis-[30%]   bg-gradient-to-tr from-primary to-sidebar to-[35%]  p-6 rounded-lg` }  >
                    <div className=' justify-between text-white capitalize  text-lg'>
                        <div className='flex justify-between '>
                            <p data-testid='daily'  className='text-sm md:text-lg'> daily</p> 
                            <p data-testid='daily-login' className='text-sm md:text-lg'>{creator?.daily_logins}</p>                  
                        </div>
                <ActivitySquareIcon className='mx-auto mt-4 md:w-[60px] w-[40px] md:h-[60px] h-[40] text-4xl'/>
                    </div>  
                </div>
                <div className={`basis-[30%] lg:basis-[40%] xl:basis-[30%]   bg-gradient-to-tr from-primary to-sidebar to-[35%]  p-6 rounded-lg` }  >
                    <div className=' justify-between text-white capitalize  text-lg'>
                        <div className='flex justify-between '>
                            <p  data-testid='weekly' className='text-sm md:text-lg'> weekly</p> 
                            <p data-testid='weekly-login' className='text-sm md:text-lg'>{creator?.weekly_logins}</p>                  
                        </div>
                <ActivitySquareIcon className='mx-auto mt-4 md:w-[60px] w-[40px] md:h-[60px] h-[40] text-4xl'/>
                    </div>  
                </div>
                <div className={`basis-[30%] lg:basis-[40%] xl:basis-[30%]   bg-gradient-to-tr from-primary to-sidebar to-[35%]  p-6 rounded-lg` }  >
                    <div className=' justify-between text-white capitalize  text-lg'>
                        <div className='flex justify-between '>
                            <p data-testid='monthly' className='text-sm md:text-lg'> monthly</p> 
                            <p data-testid='monthly-login' className='text-sm md:text-lg'>{creator?.monthly_logins}</p>                  
                        </div>
                <ActivitySquareIcon className='mx-auto mt-4 md:w-[60px] w-[40px] md:h-[60px] h-[40] text-4xl'/>
                    </div>  
                </div>
    </div>
        }
   </>
  )
}

export default LoginDetails 