import React, { useState } from 'react'
import Clients from '../../client/Clients'
import ClientDashboardTabs from './ClientDashboardTabs'
import Client from '../../client/Client'
import ClientHeader from '../../client/ClientHeader'

const DashboardClient = ({clients}) => {
    const [id,setId] = useState(null)
     const handleOptions = (creatorId)=>{
            if(id === creatorId){
                setId(null)
            }else{
                setId(creatorId)
            }
        }
  return (
    <div>
        <h1 className='text-center text-5xl mb-3 font-bold'>Latest Client</h1>

      <ClientHeader/>
      <div className='mt-5'>
        {
           clients.map(client => {
                const statusColors = {
                    actived: 'border-green-500 text-green-500',
                    banned: 'border-red-500 text-red-500',
                    suspended: 'border-black text-black'
                }

                const borderClass = client.status in statusColors 
                    ? `border-r-[3px] md:border-r-0 md:border-x-[3px] ${statusColors[client.status].split(' ')[0]}`
                    : ''

                const textColorClass = statusColors[client.status]?.split(' ')[1] || ''

                return (
                    <Client key={client.id}  client={client} borderClass={borderClass}
                    handleOptions={handleOptions} textColorClass={textColorClass} id={id} />
                )
            })
        }
        </div>
    </div>
  )
}

export default DashboardClient