import { useAuth } from "@/store/useAuth"
import React, { useEffect } from "react"
import Login from "./auth/Login"
import TrendingContents from "@/components/global/TrendingContents"
import { roles } from "./ViewTrendingPost"
import { MoveLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import SEO from "@/components/global/SEO"

const TrendingPage = ()=>{
    const navigate = useNavigate();
    const {user} = useAuth()
  
        if(!user){
            return(
                <div>
                    <SEO
                        title="Trending | Styleit Africa"
                         description="styleit, best fashion but in Nigeria, tailor, tailor in Lagos, fashion, fashionista, owanbe, ceremonies, african styles, international styles, designer, suit wears, female dress, male wears, agbada, buba, sokoto, abaya"
                        image="https://styleit2-0.vercel.app/preview.png"
                        url="https://styleit2-0.vercel.app/trending"
                        />
                    <Login/>
            </div>
            )
        }


    const isAdmin = roles.includes(user?.role)
    const handleBack = ()=>{
        navigate(-1)
    }

    return(
       <section>
        <SEO
        title="Trending | Styleit Africa"
        description="styleit, best fashion but in Nigeria, tailor, tailor in Lagos, fashion,
         fashionista, owanbe, ceremonies, african styles, international styles,
          designer, suit wears, female dress, male wears, agbada, buba, sokoto, abaya."
        image="https://styleit2-0.vercel.app/preview.png"
        url="https://styleit2-0.vercel.app"
        />
        <div className="container mt-6 pl-4 md:pl-0" >
                {
            isAdmin && <button className="flex gap-2 cursor-pointer" onClick={handleBack}>
                 <MoveLeft className="text-primary"/>
                Return back
            </button>
        }
        </div>
         <div data-testid="trending-page" className="pt-20 pb-32 px-4  font-lato">
            
            <TrendingContents/>
        </div>
       </section>
    )
}

export default TrendingPage
