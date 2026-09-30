import React, { useState } from 'react';
import { Camera, Mail, Lock, Phone, MapPin, X, Loader2 } from 'lucide-react';
import { useAuth } from '@/store/useAuth';
import { toast } from 'sonner';

const AdminSignUpForm =()=> {
    const {signUpAdmin} = useAuth()
  const [formData, setFormData] = useState({
    firstName: 'd',
    lastName: 'd',
    email: '',
    password: '11111111',
    confirmPassword: '11111111',
    secretPassword: 'eeee',
    phone: '11111111',
    address: '11',
    gender: '',
    picture: null
  });

  const [picturePreview, setPicturePreview] = useState(null);
  const [isLoading,setIsLoading] = useState(false)
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (result) => {
      setPicturePreview(result.target.result);
      setFormData(prev => ({ ...prev, picture: file }));
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.secretPassword) newErrors.secretPassword = 'Secret password is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.gender) newErrors.gender = 'Please select a gender';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    const _formData = new FormData()
    e.preventDefault();
    if (validateForm()) {
        _formData.append('fname',formData.firstName)
        _formData.append('lname',formData.lastName)
        _formData.append('email',formData.email)
        _formData.append('pwd',formData.password)
        _formData.append('cpwd',formData.confirmPassword)
        _formData.append('phone',formData.phone)
        _formData.append('gender',formData.gender)
        _formData.append('address',formData.address)
        _formData.append('pic',formData.picture)
        _formData.append('secretword',formData.secretPassword)
        setIsLoading(true)
        const result = await signUpAdmin(_formData);
        if(result?.status == 201){
          toast("Admin registered successfully", {
                action: {
                label: <X size={16} />,
              },
            })
        }else{
          const message = result?.data?.message||result?.data?.msg||result?.message
            toast(message||'Something went wrong while processing your request', {
                action: {
                label: <X size={16} />,
              },
            })
        }
      setIsLoading(false)
    }
};


  return (
    <div className="min-h-screenpy-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border my-16 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Fill in the admin details to get started</p>
        </div>

        <div className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl    outline-none transition"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div className=''>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl    outline-none transition"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl    outline-none transition"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl    outline-none transition"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl    outline-none transition"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Secret Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secret Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="password"
                name="secretPassword"
                value={formData.secretPassword}
                onChange={handleInputChange}
                placeholder="Enter secret password"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl    outline-none transition"
              />
            </div>
            {errors.secretPassword && <p className="text-red-500 text-sm mt-1">{errors.secretPassword}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl    outline-none transition"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter address"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl    outline-none transition"
              />
            </div>
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          {/* Gender & Picture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Gender
              </label>
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === 'Male'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-indigo-600 border-gray-300 "
                  />
                  <span className="ml-2 text-gray-700">Male</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === 'Female'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-indigo-600 border-gray-300 "
                  />
                  <span className="ml-2 text-gray-700">Female</span>
                </label>
              </div>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>

            {/* Picture Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Profile Picture
              </label>
              <div className="flex items-center gap-4">
                <label htmlFor="picture" className="cursor-pointer">
                  <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-primary transition">
                    {picturePreview ? (
                      <img src={picturePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="text-gray-400" size={24} />
                    )}
                  </div>
                </label>
                <div className="text-sm">
                  <p className="text-gray-600">Upload photo</p>
                  <p className="text-gray-400 text-xs">JPG, PNG, GIF</p>
                </div>
                <input
                  type="file"
                  id="picture"
                  accept=".jpg,.jpeg,.png,.gif"
                  onChange={handlePictureUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary text-white font-semibold py-3 rounded-xl transition duration-200 shadow-lg hover:shadow-xl"
          >
            {isLoading ? <span className='flex gap-3 items-center justify-center'> 
              <Loader2 className='animate-spin' />
              Submitting
            </span>:'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminSignUpForm