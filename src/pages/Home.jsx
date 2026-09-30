import React, { useEffect } from "react";
import Trending from "../components/home/Trending";
import Designer from "../components/home/Designer";
import mark from '../images/mark.png'
import NewLetter from "@/components/home/NewLetter";
import HappyClient from "@/components/home/HappyClient";
import { Link } from "react-router-dom";
import {motion} from 'motion/react'
import AnimatedButton from "@/components/global/AnimatedButton";
import SEO from "@/components/global/SEO";
import { useGlobalStore } from "@/store/global/useGlobal";
import axios from "axios";

const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}
const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

const Home =()=>{
    return(
        <section className="overflow-hidden" data-testid="home-page">
             <SEO
        title="Home | Styleit Africa"
        description="Find and book professional fashion designers in Nigeria."
        image="https://styleit2-0.vercel.app/preview.png"
        url="https://styleit2-0.vercel.app"
        />
            <Designer/>
            <Trending/>

           <section className="px-4 lg:px-0 container">
                       
            <motion.h3 
            initial={{opacity:0, y:-100}} 
            whileInView={{opacity:1, y:0}} 
            transition={{duration:1}} 
            className="text-center text-4xl mt-36 mb-14 text-primary font-lato font-[700]"
            >
            Benefits of working with us
            </motion.h3>                    <article className="flex flex-col md:flex-row justify-center gap-5">

                        <motion.div  initial={{opacity:0, x:-100}}
                        whileInView={{opacity:1, x:0}}
                        transition={{duration:0.5}} className="flex-[0.5] shadow-[1px_1px_6px_#ccc] rounded-2xl">
                            <div className="pt-12  px-10 border-b pb-14 font-lato font-[400]">
                                <h4 className="text-primary font-[700] text-center md:text-left text-2xl md:text-2xl pb-7">What you get as a fashion designer</h4>
                                <h5 className=" font-lato font-[400] text-lg md:text-xl">Features you will get if you register as a creator</h5>
                                <ul className=" ">
                                    <motion.li variants={item}  initial="hidden" animate="visible"  className="flex items-center gap-4 mt-4 text-lg  md:text-[1rem]"> <img src={mark} alt="mark" className="w-[23px]"/> <p> Direct contact with Clients</p> </motion.li>
                                    <motion.li variants={item}  initial="hidden" animate="visible"  className="flex items-center gap-4 mt-4 text-lg  md:text-[1rem]"> <img src={mark} alt="mark" className="w-[23px]"/> <p> Products showcase on trending</p> </motion.li>
                                    <motion.li variants={item}  initial="hidden" animate="visible"  className="flex items-center gap-4 mt-4 text-lg  md:text-[1rem]"> <img src={mark} alt="mark" className="w-[23px]"/> <p> Secure payments mode </p> </motion.li>
                                </ul>
                            </div>
                                <div  className="px-10 mt-8 mb-6">
                                    <AnimatedButton>
                                      <button
                                     className="w-full bg-primary py-6 text-white
                                     text-[1.4rem] font-[700] font-lato capitalize rounded-2xl ">
                                        <Link to='/signUp'>get started</Link>
                                        </button>
                                  </AnimatedButton>
                                </div>
                        </motion.div>
                        <motion.div initial={{opacity:0, x:100}}
                        whileInView={{opacity:1, x:0}}
                        transition={{duration:0.5}} className="flex-[0.5] shadow-[1px_1px_6px_#ccc] rounded-2xl font-lato font-[400]">
                            <div className="pt-12  px-10 pb-2 border-b ">
                                <h4 className="text-primary font-[700] text-center md:text-left text-2xl md:text-2xl pb-7">What you get as a Client</h4>
                                <h5 className=" text-lg md:text-xl">Features you will get as a Client</h5>
                                <ul className=" ">
                                    <motion.li variants={item} className="flex items-center gap-4 mt-5 text-lg md:text-[1rem] ">
                                         <img src={mark} alt="mark" className="w-[23px]"/> <p> Direct contact with Clients </p> </motion.li>
                                    <motion.li variants={item} className="flex items-center gap-4 mt-4 text-lg  md:text-[1rem] ">
                                         <img src={mark} alt="mark" className="w-[23px] "/> <p> Get the best professional for your next outfits</p> </motion.li>
                                    <motion.li variants={item} className="flex items-center gap-4 mt-4 text-lg  md:text-[1rem] ">
                                         <img src={mark} alt="mark" className="w-[23px]"/> <p> Book the service of a fashion designer </p> </motion.li>
                                    <motion.li variants={item} className="flex items-center gap-4 mt-4 text-lg  md:text-[1rem] ">
                                        
                                         <img src={mark} alt="mark" className="w-[23px]"/> <p> Prompt and secure service quality </p> </motion.li>
                                </ul>
                            </div>
                                <div className="px-10 mt-8 mb-6">
                                  <AnimatedButton>
                                      <button className="w-full bg-primary py-6 text-white
                                     text-[1.4rem] font-[700] font-lato capitalize rounded-2xl "><Link to='/signUp'>get started</Link></button>
                               
                                  </AnimatedButton>
                                </div>
                        </motion.div>
                    </article>

           </section>

      
        <HappyClient/>

        <motion.section initial={{opacity:0,y:-100}} whileInView={{opacity:1,y:0}} transition={{duration:0.8,ease:"easeInOut"}} className=" px-5 pb-10 md:pb-32">
            <article className="px-5 md:px-0  max-w-[1000px] mx-auto text-center shadow-[1px_1px_6px_#ccc] pt-12 md:pt-16 pb-6 md:pb-24 rounded-3xl font-[700] font-lato">
                <h6 className="capitalize text-primary text-[1.7rem] sm:text-4xl">Become one of our representative today</h6>
               <AnimatedButton>
                 <Link to={'/representativeSignup'}>
                        <button className="w-full md:w-[500px] mx-auto mt-5 md:mt-16 bg-primary py-4 md:py-6 text-white
                                     text-[1.4rem] font-[700] font-lato  rounded-2xl ">Join us</button>
                </Link>
               </AnimatedButton>
            </article>
        </motion.section>
        
           <NewLetter/>
        </section>
    )
}

export default Home;