import star from '../../images/star.png';
import React from "react";


const Remark =({img})=>{
    return (
        <div className="flex justify-between absolute  bottom-[29px] font-lato font-[700] left-[35px] right-[38px] ">
            <div className='flex basis-[47%] justify-center items-center gap-3 md:gap-1 lg:gap-5  py-3 rounded-[20px] check self-center'>
                <img src={star} alt="" className=' w-[26px] md:w-[29px] lg:w-[36px]  h-[26px] md:h-[29px] lg:h-[36px]' />
                <p className='text-lg lg:text-[2rem] '>5.0</p>
            </div>
            <img src={img} alt="" className='w-[50px] h-[50px] lg:w-[80px] lg:h-[80px]'/>
        </div>
    )
}

export default Remark; 
