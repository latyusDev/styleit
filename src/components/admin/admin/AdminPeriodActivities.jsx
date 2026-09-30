import React from 'react'

const AdminPeriodActivities = ({period}) => {
  return (
    
    <div className="grid grid-cols-2 md:grid-cols-4  gap-5 mb-8">
            {
            period.map((_period,index)=>{
                return(
                    <div key={index} className='  flex flex-row flex-wrap text-wrap
                     gap-4 sm:justify-between rounded-md md:rounded-sm  items-center shadow-gray-500  shadow-2xl px-3 py-5  md:p-5 '>
                        <h1 className='capitalize text-sm '>{_period.name}</h1>
                        <p>{_period.times}</p>
                    </div>
                )
            })
        }
    </div>

  )
}

export default AdminPeriodActivities