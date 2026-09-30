import React from "react";
import fb from '../../images/facebook.png';
import linkedIn from '../../images/linkedIn.png';
import instagram from '../../images/instagram.png';
import X from '../../images/X.webp';
import copyright from '../../images/copyright.png';
import { Link, useLocation } from "react-router-dom";
import { nonSubscriptionPages } from "@/static/data";
import Subscribe from "./Subscribe";
import Image from "./Image";

const Footer =()=>{

    const {pathname} = useLocation();
    const year = new Date().getFullYear();
    const path = pathname.split('/');
    const showSubscribe = nonSubscriptionPages.includes(path[path.length-1]);
    return(
        <footer className={`px-5  bg-secondary text-white font-lato font-[400] pt-8 md:pt-12 pb-5 ${path[1] === 'trending'&&'hidden'}`}>
            <div className="container">
                {
                   showSubscribe||<Subscribe/>
                }
            <div className="mb-24">
                <h2 className="text-2xl md:text-3xl mb-6">Connect with us</h2>
                <div className="flex gap-4">
                    <Link to='https://linkedin.com/company/styleit-africa' target="_blank">
                        <Image src={linkedIn} className="w-[25px] md:w-[32px]" alt="linkedIn" />
                    </Link>
                    <Link to='https://facebook.com/HqStyleitafrica' target="_blank">
                        <Image src={fb} className="w-[25px] md:w-[32px]" alt="facebook" />
                    </Link>
                    <Link to='https://x.com/hqstyleitafrica' target="_blank">
                        <Image src={X} className="w-[25px] md:w-[32px] rounded-full" alt="instagram" />
                    </Link>
                    <Link to='https://www.instagram.com/hqstyleitafrica' target="_blank">
                        <Image src={instagram} className="w-[25px] md:w-[32px]" alt="instagram" />
                    </Link>
                </div>
            </div>
            <div className="flex justify-between max-w-[630px] text-darkGray">
                <div>
                    <h3 className='font-[700] mb-8 text-lg md:text-2xl'>Company</h3>
                    <ul className="capitalize text-lg md:text-2xl">
                        <li className="mb-7">About us</li>
                        <li className="mb-7">support</li>
                    </ul>
                        <h4 className="mt-[8.5rem] capitalize text-lg md:text-2xl font-[700]">report</h4>
                </div>
                <div>
                    <h3 className='font-[700] mb-8 text-lg md:text-2xl'>Resources</h3>
                    <ul className="capitalize text-lg md:text-2xl">
                        <li className="mb-7">services</li>
                        <li className="mb-7">contact</li>
                        <li className="mb-7">event</li>
                    </ul>
                        <h4 className="mt-20 capitalize text-lg md:text-2xl font-[700]">ban</h4>
                </div>
                <div>
                    <h3 className='font-[700] mb-8 text-lg md:text-2xl'>Privacy policy</h3>
                    <ul className="capitalize text-lg md:text-2xl">
                        <li className="mb-7">help</li>
                        <li className="mb-7"><Link to='/faqs'>FAQ</Link></li>
                        <li className="mb-7">career</li>
                    </ul>
                        <h4 className="mt-20 capitalize text-lg md:text-2xl font-[700]">admin</h4>
                </div>
            </div>
            </div>
                   
            <div className="capitalize  mt-16 flex gap-3 items-center w-[max-content] mx-auto">
                  <Image src={copyright} className="w-[20px] md:w-[30px]" alt="copyright" />
                   <h5 className="text-sm md:text-xl">Styleit africa copyright {year}, all right reserved</h5> 
                   </div>
        </footer>
    )
}

export default Footer;