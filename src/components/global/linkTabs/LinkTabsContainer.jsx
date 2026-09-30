import React  from 'react'

import {  useLocation } from 'react-router-dom'
import SearchBar from '../SearchBar'
import SearchContainer from '../SearchContainer'
import LinkTabs from './LinkTabs'
import glass from '../../../images/search-normal.png'
import { useGlobalStore } from '@/store/global/useGlobal'
import SearchModal from '../SearchModal'


const LinkTabsContainer = () => {
    const {pathname} = useLocation();
    const {creators} = useGlobalStore();
  return (
   <section className='mt-4 font-lato  '>
  <SearchModal page='user-dashboard' creators={creators}/>

    {
      pathname !== '/creator/profile/edit' && <SearchContainer/>
    }
    <div className="bg-green-200 px-4 xl:px-0 py-2">
    <div className=' container'>

    <div className='flex  gap-7 items-center md:max-w-[900px] '>
     <div className='hidden md:block flex-[0.7] '>
     <form>
      <SearchBar
      imageIcon={glass}
      styles={{
        img:'absolute top-4 left-3  w-[20px]',
        input:'pl-10 w-full border text-gray-400 border-green-500 outline-none bg-green-200 rounded-lg h-12'
      }} />
       
      </form>
     </div> 

     {/* dashboard tabs */}

     <LinkTabs />
     </div>
    </div>
    </div>

  
  </section>
  )
}


export default LinkTabsContainer