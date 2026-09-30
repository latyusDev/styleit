import React from 'react'

const CreatorHeader = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_2fr_1fr_1fr_1fr] rounded-lg p-4 font-bold capitalize">
        <div>Name</div>
        <div>Email</div>
        <div>Gender</div>
        <div>Status</div>
        <div>Actions</div>
    </div>
  )
}

export default CreatorHeader