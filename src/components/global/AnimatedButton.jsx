import React from 'react'
import { motion } from 'motion/react'

const AnimatedButton = ({
    children,
    stiffness=300,
    damping=12
}) => {
  return (
     <motion.button className='w-full'
                whileTap={{scale:0.9,y:1}}
                whileHover={{scale:1.05,y:-5}} 
            transition={{type:'spring',stiffness,damping}}
                >
                {children}
                </motion.button>
  )
}

export default AnimatedButton