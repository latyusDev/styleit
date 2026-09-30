import React, { memo } from 'react'
import Image from './Image'
import Indicator from './Indicator'
import avatar from '@/images/avatar_profile.png'

const User = ({userProps}) => {
    const {image,indicator,name,container} = userProps
  return (
    <div className={container}>
    <div className=' relative '>
              {   image.profileImage ?
       <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm md:text-md font-semibold md:font-bold">
          <Image src={image.profileImage}  className='w-full h-full rounded-full' />
        </div>
              : 
          <Image src={avatar}  className='size-20 rounded-full' />
              }
    
       {indicator.isIndicator && <Indicator className={indicator.styles}/>}
    </div>
    {
        name.fullName ? 
        <p className={name.styles+' capitalize'}>{name.userProfile?.firstName||name.userProfile?.first_name} {name.userProfile?.lastName||name.userProfile?.last_name}</p>
        :<p className={name.styles+' capitalize'}>{name.userProfile?.first_name||name.userProfile?.firstName} </p>
    }
</div>
  )
}

export default memo(User)