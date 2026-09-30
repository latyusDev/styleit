import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Lock, Mail, Loader2, Shield, X, Eye, EyeClosed, EyeOff } from 'lucide-react';
import { useAuth } from '@/store/useAuth';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { adminLoginSchema } from '@/validations/authValidation';

export default function AdminLoginForm() {
  const navigate = useNavigate();
  const {setRole,isLoading,setIsLoading,token,login,error} = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const form = useForm({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      pwd: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true)
    const response = await login(data);
    if(response?.status === 200){
      toast("Logged in successfully", {
        action: {
          label: <X size={16} />,
        },
      })
    }
  
    setIsLoading(false)
  };

  useEffect(()=>{
    setRole('admin')
  },[])

  useEffect(()=>{
    if(token){
      navigate('/admin/dashboard')
    }
  },[token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-2">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold  text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="admin@example.com"
                          className="pl-10"
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className='text-red-500' />
                  </FormItem>
                )}
              />
              {error&&<p className='text-red-500'>{error}</p>}

              <FormField
                control={form.control}
                name="pwd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        
                        {/* ✅ Eye toggle */}
                       {
                        showPassword ? <EyeOff
                          onClick={handleShowPassword} 
                          className="absolute cursor-pointer right-3 top-3 h-4 w-4 text-gray-400" 
                        />: <Eye 
                          onClick={handleShowPassword} 
                          className="absolute cursor-pointer right-3 top-3 h-4 w-4 text-gray-400" 
                        />
                       }

                        <Input
                          type={showPassword ? "text" : "password"} 
                          placeholder="Enter your password"
                          className="pl-10"
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className='text-red-500' />
                  </FormItem>
                )}
              />

              <Button type="submit" className="text-white w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <p className=' text-center '>
            <Link to={`/admin/forgottenPassword`} className=' text-primary hover:underline'>Forgotten Password</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}