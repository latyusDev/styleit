import React, { useState } from 'react'
import { happyClients } from '@/static/data'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
  } from "@/components/ui/carousel"
import { CardContent } from '../ui/card'
import { motion } from 'motion/react'

const HappyClient = () => {

  const [api,setApi] = useState()
  const [current,setCurrent] = useState(0);
  const [count,setCount] = useState(0);


  React.useEffect(()=>{
    if(!api){
      return;
    }
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)
      api.on('select',()=>{
        setCurrent(api.selectedScrollSnap()+1)
  })
  
  },[api])


  return (
    <section className="pt-12 pb-16 md:py-28">
               
    <article className="container">
         <motion.h5 
         initial={{ opacity: 0, y: -40 }}
         whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
         className="text-center capitalize text-primary text-4xl font-lato font-[700] mb-7 ">our happy client</motion.h5>
                           <motion.div initial={{ opacity: 0, y: -30 }}
         whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}>
                             <Carousel
                             setApi={setApi}
             opts={{
                 align: "start",
                 loop:true
             }}
             className="w-full  px-10 xl:px-0  md:max-w-[1100px] mx-auto"
             >
             <CarouselContent >
                 {happyClients.map((client,index) => (
                 <CarouselItem key={index} className=" lg:basis-1/2 xl:basis-1/2 ">
                         <CardContent className="relative font-lato font-[400] min- h-[260px]  my-4 mx-1  rounded-3xl pt-16 pb-4 px-4  text-center border-[2px]l shadow-[1px_1px_6px_#ccc]">
                                         <p className="text-md md:text-2xl text-left pl-3 md:pr-9 mb-7">{client.feedback.comment}</p>
                                         <div className=" absolute bottom-4 right-4 flex gap-2 items-end w-[max-content] ">
                                             <h6 className="text-2xl mb-2">{client.name}</h6>
                                             <img src={client.imageUrl} alt=""  className="w-[70px] mr-5"/>
                                         </div>
                         </CardContent>
                 </CarouselItem>
                 ))}
             </CarouselContent>
            <CarouselNext className="text-primary text-2xl bg-secondary p-3 stkatic right-0 md:right-[4c0px] xl:right-[-50px] xl:absolute"/>
                <div className="flex gap-1 justify-center  mt-2 ">
                      {Array.from({length:count}).map((_,index)=>{
                        return (
                          <div key={index} className={`h-3 w-3  rounded-full  ${index+1 == current ? "bg-primary ":"bg-gray-200"}`}></div>
                        )
                      })
                    }
            </div>
             </Carousel>
                            </motion.div> 

    </article>
</section>
  )
}

export default HappyClient