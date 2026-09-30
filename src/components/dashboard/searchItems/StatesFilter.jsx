import { Skeleton } from '@/components/ui/skeleton'
import { useAuthService } from '@/store/useAuthService'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { motion } from 'motion/react'

const StatesFilter = ({handleFilterByState, desginerState}) => {
    const { getStates } = useAuthService()
    const { data, isLoading, isError } = useQuery({
      queryKey: ['states'],
      queryFn: getStates,
      staleTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    })

  return (
    <div className='flex-1 md:flex-[0.2] h-[300px] overflow-y-auto pb-4'>
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className='text-center mt-5 mb-4 md:mt-0 md:mb-1'
      >
        Filter by states
      </motion.h1>

      <ul>
        {/* desktop */}
        <motion.li
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          onClick={() => handleFilterByState('all', false)}
          className={`mt-1 cursor-pointer hover:text-white hover:bg-[#ff6186] shadow-md rounded-sm p-2 hidden md:block ${desginerState === 'all' && 'bg-primary text-white'}`}
        >
          All designers
        </motion.li>

        {/* mobile */}
        <motion.li
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          onClick={() => handleFilterByState('all', true)}
          className={`mt-1 cursor-pointer hover:text-white hover:bg-[#ff6186] shadow-md rounded-sm p-2 md:hidden ${desginerState === 'all' && 'bg-primary text-white'}`}
        >
          All designers
        </motion.li>

        {isLoading ? (
          <div data-testid="state-loader">
            <Skeleton className="w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8]" />
            <Skeleton className="mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8]" />
            <Skeleton className="mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8]" />
            <Skeleton className="mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8]" />
            <Skeleton className="mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8]" />
          </div>
        ) : isError ? (
          <p>Failed to fetch states</p>
        ) : (
          <li>
            {/* desktop */}
            {data?.states?.map((state, index) => (
              <motion.div
                key={state.state_id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
                onClick={() => handleFilterByState(state.state_name, false)}
                className={`mt-1 hidden md:block cursor-pointer shadow-md rounded-sm p-2 hover:text-white hover:bg-[#ff6186]
                  ${state.state_name.toLowerCase() === desginerState.toLowerCase() && 'bg-primary text-white'}`}
              >
                {state.state_name}
              </motion.div>
            ))}

            {/* mobile */}
            {data?.states?.map((state, index) => (
              <motion.div
                key={state.state_id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
                onClick={() => handleFilterByState(state.state_name, true)}
                className={`mt-1 md:hidden cursor-pointer shadow-md rounded-sm p-2
                  ${state.state_name.toLowerCase() === desginerState.toLowerCase() && 'bg-primary text-white'}`}
              >
                {state.state_name}
              </motion.div>
            ))}
          </li>
        )}
      </ul>
    </div>
  )
}

export default StatesFilter