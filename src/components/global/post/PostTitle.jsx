import React, { memo } from 'react'

const PostTitle = ({title}) => {
  return (
    <h1 className='  font-[500] text-lg my-2 leading-5 '>{title}</h1>
  )
}

export default memo(PostTitle)