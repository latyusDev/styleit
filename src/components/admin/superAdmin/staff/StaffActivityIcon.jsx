import { ActivitySquareIcon, BanIcon, Lock, LockKeyholeOpen, Trash2, TrashIcon } from 'lucide-react'
import React from 'react'

const StaffActivityIcon = ({activity}) => {
    switch(activity){
        case 1:
            return  <TrashIcon className='mx-auto mt-4 md:w-[60px] w-[40px] md:h-[60px] h-[40] text-4xl'/>
        case 2:
            return  <Lock className='mx-auto mt-4 md:w-[60px] w-[40px] md:h-[60px] h-[40] text-4xl'/>
        case 3:
            return  <ActivitySquareIcon className='mx-auto mt-4 md:w-[60px] w-[40px] md:h-[60px] h-[40] text-4xl'/>
    }
    return <Trash2 className='mx-auto mt-4 md:w-[60px] w-[40px] md:h-[60px] h-[40] text-4xl'/>    
}

export default StaffActivityIcon