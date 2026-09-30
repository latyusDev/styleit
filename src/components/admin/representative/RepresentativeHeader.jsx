import React from 'react'

const RepresentativeHeader = () => {
  return (
    <div className=" grid grid-cols-7 gap-5 rounded-lg p-4 font-bold capitalize">
        <div className=" text-left">Name</div>
        <div className=" text-left">Email</div>
        <div className=" text-left">Phone</div>
        <div className=" text-left">Gender</div>
        <div className=" text-left">State</div>
        <div className=" text-left">LGA</div>
        <div className=" text-left">Ref Code</div>
    </div>
  )
}

export default RepresentativeHeader