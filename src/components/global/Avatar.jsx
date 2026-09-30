import React, { memo, useMemo } from 'react'
import Image from './Image'
import { bgColors } from '@/static/adminData'


const Avatar = ({data}) => {
    const {complaint,section,style="w-[40px] h-[40px] rounded-full"} = data
    // const name = useMemo(()=>{
    //     complaint.name.split(' ').length > 0 ? 
    // `${complaint.name.split(' ')[0].slice(0,1)} ${complaint.name.split(' ')[1].slice(0,1)} `: complaint.name.split(' ')[0].slice(0,1)
    // },[complaint.name])

    const name = useMemo(() => {
  const parts = complaint.name.split(' ')

  if (parts.length > 1) {
    return `${parts[0][0]} ${parts[1][0]}`
  }

  return parts[0][0]
}, [complaint.name])
    
     const randomIndex = useMemo(() => 
        Math.floor(Math.random() * bgColors.length)
    , [])
    return (
   <div>
        {
            complaint.image ?(
                <Image src={complaint.image} className={style} data-testid="image" />
            ):
            (
            <div data-testid="customizedAvatar" className={`w-[40px] py-2 uppercase rounded-full text-center ${section === 3 && bgColors[randomIndex]} ${section === 2 && 'bg-primary'} ${section === 1 &&'bg-sidebar'}   text-md text-white`}>
                {name}
            </div>
            )
        }
   </div>
  ) 
}

export default memo(Avatar)