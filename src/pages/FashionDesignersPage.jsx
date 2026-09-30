import React, { useEffect } from "react"
import { useAuth } from "@/store/useAuth";
import AllFashionDesigners from "@/components/dashboard/creator/fashionDesigners/AllFashionDesigners";
import Login from "./auth/Login";
import axios from "axios";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";
import SEO from "@/components/global/SEO";

const FashionDesignersPage = ()=>{
       const {user} = useAuth()
    if(!user){
        return(
            <div>
                <SEO
                    title="Fashion Designers | Styleit Africa"
                    description="Find and book professional fashion designers in Nigeria."
                    image="https://styleit2-0.vercel.app/preview.png"
                    url="https://styleit2-0.vercel.app/fashionDesigners"
                    />
                <Login/>
            </div>
        )
    }


    return(
        <section data-testid="fashion-page" className="  font-lato">
        <SEO
        title="Fashion Designers | Styleit Africa"
        description="Find and book professional fashion designers in Nigeria."
        image="https://styleit2-0.vercel.app/preview.png"
        url="https://styleit2-0.vercel.app/fashionDesigners"
        />
                    <AllFashionDesigners/>
        </section>
    )
}

export default FashionDesignersPage



