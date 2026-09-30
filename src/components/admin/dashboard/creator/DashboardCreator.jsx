import React, { useState } from 'react'
import CreatorDashboardTabs from './CreatorDashboardTabs'
import Creator from '../../creator/Creator'
import CreatorHeader from '../../creator/CreatorHeader'
import CreatorCard from '../../creator/CreatorCard'

const DashboardCreator = ({creators}) => {
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
                <h1 className='text-center text-5xl mb-3 font-bold'>Latest Creators</h1>
        <div className='hidden md:block'>
            <CreatorHeader/>
        </div>
        <div className='mt-5'>
          <div className="space-y-4 pb-4 hidden md:block">
              {creators?.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow-md">
                      No creators found
                  </div>
              ) : (
                
                  creators?.map(creator => (
                    <Creator key={creator.id||creator.designer_id} creator={creator} 
                    handleOptions={handleOptions} id={id}/>
                  ))
              )}
          </div>
                 {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                    {creators?.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            No creators found
                        </div>
                    ) : (
                        creators?.map(creator => (
                            <CreatorCard creator={creator} 
                            handleOptions={handleOptions} id={id}/>
                        ))
                    )}
                </div>
        </div>

    </div>
  )
}

export default DashboardCreator