'use client';
import { supabase } from '@/lib/supabaseClient';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { countries } from '@/lib/countries';
import { FaSeedling } from "react-icons/fa";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName : '',
    mobile: '',
    country: countries[1].dial_code,
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef(null);
  const [loggedIn,setloggedIn] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleCountryChange = (countryCode) => {
    setFormData(prev => ({ ...prev, country: countryCode }));
    setIsCountryDropdownOpen(false);
    if (errors.country) setErrors(prev => ({ ...prev, country: '' }));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    else if (!/^\d{7,15}$/.test(formData.mobile)) newErrors.mobile = 'Enter a valid mobile number';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if(isLoading) return;
  if (!validateForm()) return;
  setIsLoading(true);

  try {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });
    
    if (data?.user) {
      // Insert into userInfo table using the same user ID
      const { error: infoError } = await supabase.from("userinfo").insert({
        id: data.user.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobile: formData.mobile,
        country: formData.country,
      });
    }
    if (error) {
      console.error("Insert error:", error);
    }
  } catch (error) {
    console.error(error);
    setErrors({ general: 'Signup failed. Please try again.' });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 md:ml-64">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 mx-2">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-2">
            <FaSeedling className="text-3xl text-green-700" />
            <span className="text-2xl font-bold tracking-tight text-green-800">AgroGram</span>
          </div>
          <h2 className="text-2xl font-bold text-green-900">Create your account</h2>
          <p className="text-green-700 mt-1 text-sm">Sign up to start your journey</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-1/2">
                <label htmlFor="firstName" className="block text-sm font-bold text-green-800 mb-1">First Name</label>
                <input id="firstName" name="firstName" type="text" required value={formData.firstName} onChange={handleInputChange} className={`w-full px-3 py-3 border rounded-lg placeholder-green-300 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 sm:text-sm transition-colors ${errors.firstName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-green-200'}`} placeholder="First name" />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
              </div>
              <div className="w-1/2">
                <label htmlFor="lastName" className="block text-sm font-bold text-green-800 mb-1">Last Name</label>
                <input id="lastName" name="lastName" type="text" required value={formData.lastName} onChange={handleInputChange} className={`w-full px-3 py-3 border rounded-lg placeholder-green-300 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 sm:text-sm transition-colors ${errors.lastName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-green-200'}`} placeholder="Last name" />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="mobile" className="block text-sm font-bold text-green-800 mb-1">Mobile Number</label>
              <div className="flex gap-2">
                <div className="relative" ref={countryDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                    className="flex items-center justify-between w-24 px-3 py-3 border rounded-lg bg-white border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                  >
                    <div className="flex items-center">
                      <img 
                        src={countries.find(c => c.dial_code === formData.country)?.flagUrl} 
                        alt="flag" 
                        className="w-5 h-4 mr-1 rounded"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'inline';
                        }}
                      />
                      <span className="text-sm">{formData.country}</span>
                    </div>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isCountryDropdownOpen && (
                    <div className="absolute z-10 w-48 mt-1 bg-white border border-green-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => handleCountryChange(country.dial_code)}
                          className="flex items-center w-full px-3 py-2 text-left hover:bg-green-50 transition-colors"
                        >
                          <img 
                            src={country.flagUrl} 
                            alt={country.name} 
                            className="w-5 h-4 mr-2 rounded"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'inline';
                            }}
                          />
                          <span className="text-sm">{country.flag}</span>
                          <span className="text-sm ml-2">{country.dial_code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input id="mobile" name="mobile" type="tel" required value={formData.mobile} onChange={handleInputChange} className={`flex-1 px-3 py-3 border rounded-lg placeholder-green-300 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 sm:text-sm transition-colors ${errors.mobile ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-green-200'}`} placeholder="Mobile number" />
              </div>
              {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-green-800 mb-1">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleInputChange} className={`w-full px-3 py-3 border rounded-lg placeholder-green-300 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 sm:text-sm transition-colors ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-green-200'}`} placeholder="Enter your email" />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-green-800 mb-1">Password</label>
              <div className="relative">
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required value={formData.password} onChange={handleInputChange} className={`w-full px-3 py-3 pr-10 border rounded-lg placeholder-green-300 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 sm:text-sm transition-colors ${errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-green-200'}`} placeholder="Create a password" />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
          </div>
          {errors.general && <div className="bg-red-50 border border-red-200 rounded-lg p-3"><p className="text-sm text-red-600">{errors.general}</p></div>}
          <div>
            <button type="submit" disabled={isLoading} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing up...
                </div>
              ) : (
                'Sign up'
              )}
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm text-green-700">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-green-700 hover:text-green-900 transition-colors">
                Log in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}


