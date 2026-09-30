import React from "react";
import glass from '../../images/glass.png';
import redLady from '../../images/Image.png';
import angelina from '../../images/angelina.png';
import bobby from '../../images/bobby.png';
import sandra from '../../images/sandra.png';
import starIcon from '../../images/star.png';
import { useGlobalStore } from "@/store/global/useGlobal";
import SearchModal from "../global/SearchModal";
import { motion } from "motion/react";

const Designer =()=>{
  const {searchModal,setSearchModal,creators} = useGlobalStore()
    return(
        <section className=' md:min-h-[900px]  bg-gradient-to-tl to-primary font-lato to-[50%] from-[50%] md:to-[54.2%] from-white md:from-[54.7%] relative  '>
        {
          searchModal&&<SearchModal creators={creators} page='home' />
        }
        <article className='container'>
      
      <div className='  px-4 xl:px-0 mx-auto lg:mx-0 xl:max-w-auto  flex flex-col md:gap-12 xl:gap-0  lg:flex-row items-start   text-light '>
           <motion.div  initial={{opacity:0, x:-100}}
                        whileInView={{opacity:1, x:0}}
                        transition={{duration:0.5}} className='w-auto md:basis-[59%] pt-6 md:pt-28  '>
              <h1 className='text-2xl md:text-[2.1rem] leading-[1.4]  font-[500]  '>Looking For A Professional Fashion Designer?</h1>
                <p className=' text-lg md:text-[1.4rem] w-[75%] sm:w-[85%] md:max-w-[480px] leading-[1.5] md:font-[500] mt-4'>
                Get the best professional for your next outfit with Styleit Africa. 
                Conveniently book a service with a professional Fashion designer to get started.
                </p>

                {/* search */}
                <form className='mt-6 relative z-10 '>
                  <div className='flex' onClick={() =>{ setSearchModal(true); }}>
                    <input 
                type='text' 
                
                className='bg-white text-black rounded-l-lg block w-full sm:w-[400px] z-30 text-dark-400 outline-none font-lato py-7 md:py-[2.2rem] pl-4 md:pl-16
                placeholder:text-lg placeholder:font-[helvetica] placeholder:font-[400] shadow-sm shadow-primary md:shadow-none placeholder-secondary'
                placeholder="search fashion designers"
              />
                  <button type='button' className=' rounded-r-2xl bg-[#27213C] px-9 '>
                    <img src={glass} className='w-[35px]'/>
                    </button>
                  </div>
                </form>
           </motion.div>
           <motion.div  initial={{opacity:0, x:100}}
                        whileInView={{opacity:1, x:0}}
                        transition={{duration:0.5}} className='md:-mt-20 relative '>

<img src={redLady} className=' md:-ml-9  -mt-12 md:mt-0 w-[700px]  sm:h-auto md:h-[800px] xl:h-auto' />
<div className='absolute top-[270px] md:top-[500px] -right-2 md:right-[100px] order font-lato font-[500] leading-[1.3]
 pl-3 md:pl-5 pt-3 pb-8 pr-4 max-w-[200px] md:max-w-[290px] text-[0.98rem] h-[100px] md:h-[120px] rounded-2xl'>
    <h2 className="text-xs md:text-sm pr-5 md:pr-0">Place your order and get what you ordered. </h2>
<div className="flex gap-24 md:gap-32  pr-4 mt-2 ">
  <div className='flex '>
      <img src={angelina} className='w-[30px] md:w-[45px]  absolute left-[10px] md:left-[20px] ' />
      <img src={bobby} className='w-[30px] md:w-[45px]  absolute left-[30px]   md:left-[50px]' />
      <img src={sandra} className='w-[30px] md:w-[45px]  absolute left-[50px]  md:left-[80px] ' />
  </div>
  <div className="flex  items-center mt-2 md:mt-3">
    <img src={starIcon} className="w-4 md:w-5" alt="" />
    <img src={starIcon} className="w-4 md:w-5" alt="" />
    <img src={starIcon} className="w-4 md:w-5" alt="" />
    <img src={starIcon} className="w-4 md:w-5" alt="" />
    <img src={starIcon} className="w-4 md:w-5" alt="" />
  </div>
</div>
</div>

            </motion.div>
  </div>
        </article>
  </section>
    )
}

export default Designer