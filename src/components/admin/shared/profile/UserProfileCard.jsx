import React from 'react'

const UserProfileCard = ({cardProps,children}) => {
    const {title,sectionId,currentId,handleEdit,isAdmin=false} = cardProps;
    
  return (
    
      <div className=' border  border-gray-200 rounded-xl p-5 mt-6 bg-gradient-to-tr text-lightGray from-primary to-sidebar to-[35%]' >
      <div className='flex justify-between items-center'>
            <h1 style={sectionId=='businessName'?{ fontSize:'2rem',paddingBlock:'1rem', backgroundImage:'radial-gradient(#27213c,#fd57aa,black)',color:'transparent',backgroundClip:'text'}:{}} className='animate duration-200 capitalize font-[500] leading-9 text-lg text-white'>
              {title}</h1>
            {/* {
              !isAdmin&&<div data-id={sectionId} onClick={(e)=>handleEdit(e)} className='flex gap-2 items-center cursor-pointer bg-primary text-lightGray  bordder border-gray-200 py-3 px-5 w-[max-content] rounded-lg'>
                <p className='text-lg'>Edit</p>
                <Edit3 className='text-sm'/>
            </div>
            } */}
        </div>
        {children}

        {/* {
        currentId == sectionId && !isAdmin&&
        <div className="w-[max-content] mx-auto mt-5">
         <Button className="bg-primary hover:bg-primary text-lightGray px-8 py-6">Submit</Button>
         </div>        
       }  */}

    </div>
  )
}

export default UserProfileCard