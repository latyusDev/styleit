import React from "react";
import { Button } from "../ui/button";
import useTogggleAuthPage from '../../hooks/useToggleAuthPage'

const ToggleAuthPage = ({role,page})=>{
    const {togglePage} = useTogggleAuthPage()
    return(
        <p className='text-center mt-8 font-lato font-[500]'>Want to {page === 'login' ? 'log in':'sign up'} as a {role == 'designer' ? 'client':'fashion designer'} ? 
        <Button onClick={()=>togglePage(page,role,false)} className="text-primary ml-1 p-0 bg-white shadow-none hover:bg-white">click here</Button></p>
    )
}
export default ToggleAuthPage