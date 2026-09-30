import { useAuthService } from '@/store/useAuthService'

const useToggleAuthPage = () => {
    const {setIsLoginForm,setIsSignUpForm,setRole} = useAuthService(state=>state)
    const togglePage = (page,role,value)=>{
        if(page == 'login'){
          setIsLoginForm(value)
          setRole(role)
        }
        if(page == 'signUp'){
          setIsSignUpForm(value)
          setRole(role)

        }
      }
  return {togglePage}
}

export default useToggleAuthPage