import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate();
  return (
     <div className='px-5 py-10'>
    <div className=' max-w-[600px] mx-auto text-center  py-24 shadow-md rounded-md'>
       <h1 className='text-2xl '>This page does not exist, return <button className='text-primary' onClick={()=>navigate(-1)}>back</button></h1>
     </div>
    </div>
  )
}

export default NotFound