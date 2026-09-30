import React, { memo } from 'react'
import { motion } from 'motion/react'
import check from '../../images/Check.png'
const Reasons = ({reasons,header,image,isSignUp,level,isClient=true}) => {
  return (
    <motion.div 
    initial={{opacity:0,x:-100}}
     animate={{x:0,opacity:1,transition:{duration:1}}} 
     data-testid="reasons" className='relative font-lato font-[500] bg-primary text-white flex-[0.45] px-12 pt-12 hidden md:block'>
        <h1 className=' capitalize text-xl'>{header}</h1>
        <ul>
          {
            reasons.map(reason=>{
              return(
                
                <li key={reason} className="flex  items-center gap-4 mt-3"><div> <img src={check} className='w-[20px] ' alt="check" /></div> <p>{reason}</p></li>
              )
            })
          }
           
        </ul>
        {
          isSignUp 
          ?
         <>
          
            <img src={image} className={` ${isSignUp ?` ' ${level == 2? 'h-[270px] right-[7rem]':'h-[460px]'}   absolute bottom-0 right-16'`:' h-[350px] -mt-8 w-[330px]'}`} alt="image" />
          </>:
            
            <img src={image} className={` ${isClient ? ' h-[320px] -mr-20 mt-4 w-[360px]':' h-[350px] -mt-8 w-[330px]'}`} alt="image" />
          

        }

    </motion.div>
  )
}

export default memo(Reasons)