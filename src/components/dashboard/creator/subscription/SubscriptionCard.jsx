import axios from "axios"
import Cookies from "js-cookie"
import { Loader2, X } from "lucide-react"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"


const SubscriptionCard = ({subscription,subscriptions,proceed,isShow,btnContent})=>{
    const [isPending,setIsPending] = useState(false);
    const navigate = useNavigate()
    
    const subscribe = async(id)=>{
          setIsPending(true)
           if(btnContent == 'Pay now'){
                proceed()
             }else{
                  try{
                  const response = await axios.post(`designer/sub`,{plan:`${subscription.amount}`},{
                            headers: {
                                  Authorization: `Bearer ${Cookies.get('token')}`,
                                  'Content-Type': 'application/json',
                                  Accept:'application/json'
                          }
                        })
          
          if(subscription.amount !== 'free'&&response.status === 201){
                localStorage.setItem('refno',response?.data?.subscription.reference);
                navigate(`/creator/subscriptions/${id}/proceed`)
          }
          if(response.status === 200){
                toast(response?.data?.message||'Something went wrong, please try again later', {
                action: {
                label: <X size={16} />,
              },
            })
                navigate(`/creator/subscriptions`)
          }
           
             }catch(error){
                 toast(error?.response?.data?.message||error?.message||'Something went wrong, please try again later', {
                action: {
                label: <X size={16} />,
              },
            })
             }finally{
                 setIsPending(false)
             }
             }
           
            
    }
    
    return(
        
        <div className={ ` p-5 rounded-xl mt-8 text-center  border border-gray-100  shadow-md  ${isShow&&'shadow-none'}`}>
        <h2 className='text-xl font-[500] capitalize'>{subscription.period} plan</h2>
        <p className='mt-8'>{subscription.discount}</p>
        <p className={`mt-9 font-[500] text-lg ${subscription.amount > subscriptions[1].amount && 'text-green-400'}`}>{subscription.amount === 'free'?'free':'N'+subscription.amount+'.00'}</p>
        
        {
            isShow ? 
                <button onClick={()=>subscribe(subscription.id)}
             disabled={isPending} className='capitalize font-[500] text-lg px-0 py-4 rounded-xl block
                w-full mt-9 bg-primary text-white hover:bg-white hover:border hover:border-primary hover:text-primary cursor-pointer'> {isPending?<span className="flex items-center justify-center gap-2"><Loader2  className='animate-spin'/> processing...</span>:btnContent}</button>
                                
            :
            <Link to={`/creator/subscriptions/${subscription.id}`} className={`capitalize block ont-[500] text-lg px-0 py-4 rounded-xl  border border-primary
                w-full mt-9 ${subscription.amount > subscriptions[1].amount ? ' bg-primary text-white hover:bg-[#ffffff] hover:text-[#FF617C]':'bg-white  hover:bg-primary hover:text-white'}`}>{btnContent}</Link>
        }
    </div>
    )
}

export default SubscriptionCard