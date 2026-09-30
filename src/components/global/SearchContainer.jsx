import React from 'react'
import profileImage from '../../images/avatar_profile.png'
import glass from '../../images/search-normal.png';
import Image from './Image'
import SearchBar from './SearchBar'
import Indicator from './Indicator';
import { useAuth } from '@/store/useAuth';

const SearchContainer = () => {

 const {user} = useAuth();
 const isClient = user?.role === 'client'

  return (
    <div className="container mb-2  md:hidden">
        <div className='flex justify-between items-center'>
        <SearchBar 
            placeholder='search anything here'
            imageIcon={glass}
            styles={{
            img:'absolute top-3 left-3.5  w-[20px]',
            input:'pl-10 w-full border placeholder-gray-400 border-green-500 outline-none  rounded-lg h-12'
        }} />        
        <div>
          <div className='relative pr-4'>
            <Image src={isClient?(user?.profilePic||profileImage):(user?.profile_pic||profileImage)} className="size-[50px] rounded-full "  alt="" />
            <Indicator className='h-2 w-2 absolute top-0.5 right-5 rounded-full bg-red-600 '/>
          </div>
        </div>
    </div>
    </div>
  )
}

export default SearchContainer