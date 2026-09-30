import { Button } from '@/components/ui/button'
import {Loader2, X } from 'lucide-react'
import React, {useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios'
import Cookies from 'js-cookie'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/store/useAuth'
import { toast } from 'sonner'

const Report = ({user,setShowReport}) => {
  const {user:authUser} = useAuth();
  const [reportData,setReportData] = useState({
    custid:authUser.id,
    desid:user.creator_id,
    custname:authUser?.first_name,
    desname:user.firstName,
    report: ""
})


  const report = async(data)=>{
    const response = await axios.post('report/',data,{
       headers: {
                  Authorization: `Bearer ${Cookies.get('token')}`,
                  'Content-Type': 'application/json',
                  Accept:'application/json'
              },
      withCredentials:true
    })
    return response;
  }

  const {mutate,isPending} = useMutation({
    mutationFn:report,
    onSuccess:(response)=>{
        if(response?.status === 201){
          setShowReport(false)
          toast("Report", {
            description:<p className='text-white'>Post reported successfully <span>&#x1F44D;</span></p>,
              action: {
              label: <X size={16} />,
            },
          })
            }
        },
        onError:()=>{
           toast("Report", {
            description:<p className='text-white'>Something went wrong, please try again <span>&#x1F44D;</span></p>,
              action: {
              label: <X size={16} />,
            },
          })
        }
  })

  const handleReport = ()=>{
    mutate(reportData)

  }
return (
    <div 
        className='font-lato flex justify-center items-center z-50 fixed inset-0 overflow-hidden px-4'
        style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
        onClick={() => setShowReport(false)}
    >
        <div 
            className="w-full md:w-[600px] bg-white rounded-md relative z-50"
            onClick={(e) => e.stopPropagation()}
        >
            {/* header */}
            <div className=" ml-auto max-w-[450px] px-5 py-3 flex items-center justify-between">
                <h1 className='font-bold text-lg md:text-xl'>Report {user?.firstName}'s Post</h1>
                <X 
                    className='cursor-pointer h-8 w-8 transition-all duration-300 hover:scale-125' 
                    onClick={() => setShowReport(false)}
                />
            </div>
            <div className='border-b h-2'></div>

            {/* body */}
            <div className='p-4 md:p-7'>
                <Textarea 
                    placeholder="What is your report!" 
                    value={reportData.report}
                    onChange={(e) => setReportData({...reportData, report: e.target.value})} 
                    className='w-full h-[200px] placeholder:text-base md:placeholder:text-xl shadow-md mt-5 focus-visible:ring-0'
                />
                <Button 
                    onClick={handleReport} 
                    disabled={reportData.report === ''} 
                    className='bg-primary text-white w-full mt-6 py-4 font-[700] capitalize'
                >
                    {isPending && <Loader2 className='animate-spin mr-2'/>} 
                    Kindly Report
                </Button>
            </div>
        </div>
    </div>
)
}

export default Report