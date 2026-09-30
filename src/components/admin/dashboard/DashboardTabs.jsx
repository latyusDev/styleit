import { CalendarClock, Clock, CreditCard, LucideMegaphone, LucideMonitorX, PiggyBank, RectangleVerticalIcon, SubscriptIcon, User, UserX, Wallet } from 'lucide-react'
import React from 'react'

const DashboardTabs = ({currentTab,setCurrentTab,data}) => {

    const updateTab =(index,tab)=>{
        if(tab.isClickable){
            setCurrentTab(index)
            window.scrollTo({
                left:0,
                top:615,
                behavior:'smooth'
            })
        }

    }

    const adminDashboardTabs = [
      
        {
            id:1,
            name:'creators',
            isClickable:true,
            icon:<User  className='size-9 mt-4'/>,
            total:data?.total_creator
        },
        {
            id:2,
            name:'clients',
            isClickable:true,
            icon:<User  className='size-9 mt-4'/>,
            total:data?.total_client
        },
        {
            id:3,
            name:'bookings',
            isClickable:true,
            icon:<Clock className='size-9 mt-3'/>,
            total:data?.total_appointment
        },
         
        {
            id:4,
            name:'payments',
            isClickable:true,
            icon:<CreditCard className='size-9 mt-4'/>,
            total:data?.total_payment
        },
        {
            id:5,
            name:'subscriptions',
            isClickable:true,
            icon:<CalendarClock className='size-9 mt-3'/>,
            total:data?.total_subscription
        },
        {
            id:6,
            name:'revenue',
            isClickable:false,
            icon:<CreditCard className='size-9 mt-4'/>,
            total:'₦'+data?.total_revenue
        },
       
        {
            id:7,
            name:'transactions',
            isClickable:false,
            icon:<CreditCard className='size-9 mt-4'/>,
            total:data?.total_transaction
        },
        {
            id:8,
            name:'admins',
            isClickable:false,
            icon:<User  className='size-9 mt-4'/>,
            total:data?.total_admin
        },
          {
            id:9,
            name:'users',
            isClickable:false,
            icon:<User  className='size-9 mt-4'/>,
            total:data?.total_users
        },
          {
            id:10,
            name:'banned users',
            isClickable:false,
            icon:<UserX className='size-9 mt-3'/>,
            total:data?.total_banned_users
        },
          {
            id:11,
            name:'suspended users',
            isClickable:false,
            icon:<UserX className='size-9 mt-3'/>,
            total:data?.total_suspended_users
        },
          {
            id:12,
            name:'All transfer',
            isClickable:false,
            icon:<CreditCard className='size-9 mt-4'/>,
            total:'₦'+data?.total_transfer
        },
        
    ]
  return (
          <div className='flex flex-col md:flex-row gap-5 flex-wrap '>
        {
            adminDashboardTabs.map((tab,index)=>{
                
                return(
                    <div className={`shadow-md rounded-md grow-1 py-5 px-7 md:basis-[30%]  xl:basis-[23%] text-lightGray
                     ${index === currentTab ? 'bg-gradient-to-l to-[55%] ':'bg-gradient-to-tr'} from-primary to-sidebar to-[35%] 
                      hover:bg-gradient-to-bl cursor-pointer `} onClick={()=>updateTab(index,tab)} >
                        <div className='flex items-center justify-between'>
                            <p className='text-xl mt-4'>{tab.total}</p>
                            {/* icon */}
                            {tab.icon}
                           
                          
                        </div>
                        <h1 className='text-2xl tracking-wide text-center font-[500] capitalize mt-4'>{tab.name}</h1>
                    </div>
                )
            })
        }
        
    </div>
  )
}

export default DashboardTabs
