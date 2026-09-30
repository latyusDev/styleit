import React from 'react'
import DashboardClient from './client/DashboardClient'
import DashboardCreator from './creator/DashboardCreator'
import DashboardBookings from './booking/DashboardBookings'
import DashboardPayments from './payment/DashboardPayments'
import DashboardSubscriptions from './subscription/DashboardSubscriptions'



const CurrentDashboardTab = ({currentTab,data}) => {
  
    switch(currentTab){
        case 0:
            return <DashboardCreator creators={data?.designers}/>
        case 1:
            return <DashboardClient clients={data?.customers}/>
        case 2:
            return <DashboardBookings bookings={data?.appointments}/>
        case 3:
            return <DashboardPayments payments={data?.payments}/>
        default:
            return <DashboardSubscriptions subscriptions={data?.subscriptions}/>
           
    }
}

export default CurrentDashboardTab