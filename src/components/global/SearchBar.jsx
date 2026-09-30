import { useGlobalStore } from "@/store/global/useGlobal"
import Image from "./Image"
import React from 'react'
import { useLocation } from "react-router-dom"


const SearchBar = ({styles:{img,input,parent=''},imageIcon})=>{
  const {pathname} = useLocation();
  const {setSearchModal} = useGlobalStore();

    return(
         <div className={`relative  ${!pathname.includes('admin')&&'ml-3'} md:ml-0 flex-[0.7] ${parent}`}>
            <div className={`${input} cursor-pointer`} onClick={()=>setSearchModal(true)}>
                <p className="mt-3">Search...</p>
            </div>
            <Image src={imageIcon} className={img} alt="" />
          </div>
    )
}
 
export default SearchBar