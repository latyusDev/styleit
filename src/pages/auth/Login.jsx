import React, { useEffect } from 'react'
import young from '../../images/young.png'
import redLady from '../../images/redLady.png'
import { useAuthService } from '../../store/useAuthService'
import LoginForm from '@/components/auth/LoginForm'
import { reasons } from '@/static/data'
import ToggleAuthPage from '@/components/global/ToggleAuthPage'
import { useAuth } from '@/store/useAuth'
import { useNavigate } from 'react-router-dom'
import SEO from '@/components/global/SEO'


const Login = ()=> {

  const {isLoginForm} = useAuthService((state)=>state)
  const {role,user} = useAuth();
      const navigate = useNavigate();
  

  useEffect(()=>{

  if(user){
      navigate(-1)
  }
  },[navigate])

  return (

    <section data-testid="login-page"  className='pb-16'>
         <SEO
        title="Login | Styleit Africa"
            description="styleit, login , best fashion but in Nigeria, tailor, tailor in Lagos, fashion, fashionista, owanbe, ceremonies, african styles, international styles, designer, suit wears, female dress, male wears, agbada, buba, sokoto, abaya"
        image="https://styleit2-0.vercel.app/preview.png"
        url="https://styleit2-0.vercel.app/login"
        />
        {
            role == 'designer' ?
             <LoginForm 
            reasons={reasons.clientLogin} image={young} 
            header="Ready to find your next client ? let's go"/>:   
            <LoginForm  
            reasons={reasons.fashionLogin} image={redLady} 
            header="Ignite your style with styleit africa"/>
        }

        {
            isLoginForm && <ToggleAuthPage role={role} page='login'/>
        }
      
    </section>

  )
}



export default Login