import React, { useEffect } from 'react'
import african from '../../images/african.png'
import { reasons } from '@/static/data'
import { useAuthService } from '@/store/useAuthService'
import SignUpForm from '@/components/auth/SignUpForm'
import ToggleAuthPage from '@/components/global/ToggleAuthPage'
import useToggleAuthPage from '@/hooks/useToggleAuthPage'
import { useAuth } from '@/store/useAuth'
import { useNavigate } from 'react-router-dom'
import SEO from '@/components/global/SEO'


const SignUp = ()=> {

    const {isSignUpForm,role} = useAuthService((state)=>state)
    const {togglePage} = useToggleAuthPage()
    const {user} = useAuth()
    const navigate = useNavigate();
  
  const onSubmit = (role)=>{
    togglePage()
  }

  useEffect(()=>{
  if(user){
      navigate(-1)
  }
  },[navigate])

  return (
    <section data-testid="signUp-page"  className='pb-16'>
         <SEO
        title="Sign Up | Styleit Africa"
            description="styleit, sign up , best fashion but in Nigeria, tailor, tailor in Lagos, fashion, fashionista, owanbe, ceremonies, african styles, international styles, designer, suit wears, female dress, male wears, agbada, buba, sokoto, abaya"
        image="https://styleit2-0.vercel.app/preview.png"
        url="https://styleit2-0.vercel.app/signUp"
        />
           {
            role == 'designer' ?
             <SignUpForm 
            reasons={reasons.clientSignUp} image={african} 
            header="join as fashion designers and make your works known"/>:   
            <SignUpForm  
            reasons={reasons.fashionSignUp} image={african} 
            header="join as fashion designers and make your works known"/>
        }

        {
            isSignUpForm && <ToggleAuthPage page="signUp" role={role}/>

        }
    </section>
  )
}



export default SignUp