'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SigninPage() {
  const [accountType, setAccountType] = useState<'user' | 'hr'>('user');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    department: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if already logged in
  if (status === 'authenticated') {
    router.push('/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Here you would typically create a user account
      console.log('Registration attempt:', { accountType, ...formData });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // After successful registration, redirect to login or dashboard
      alert('Account created successfully! Please sign in.');
      router.push('/');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = async (provider: string) => {
    setIsLoading(true);
    try {
      const result = await signIn(provider, { 
        callbackUrl: '/dashboard',
        loginType: 'user', // Only allow social signup for users
        redirect: false
      });
      
      if (result?.error) {
        console.error(`${provider} signup error:`, result.error);
        if (result.error === 'Configuration') {
          alert(`❌ ${provider} signup is not configured!\n\nTo enable ${provider} signup:\n1. Get credentials from ${provider} developer console\n2. Update .env.local file\n3. Restart the server\n\nVisit /test-oauth to see which providers are configured.`);
        } else if (result.error === 'OAuthSignin') {
          alert(`❌ ${provider} OAuth setup error!\n\nPlease check your ${provider} OAuth configuration in .env.local`);
        } else {
          alert(`❌ ${provider} signup failed: ${result.error}`);
        }
      } else if (result?.url) {
        // Redirect to the OAuth provider
        window.location.href = result.url;
      } else {
        alert(`❌ ${provider} signup failed. Please check your configuration.`);
      }
    } catch (error) {
      console.error(`${provider} signup error:`, error);
      alert(`❌ ${provider} signup failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-12">
      <div className="max-w-2xl w-full space-y-8 p-8">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-8 transition-all duration-300 hover:shadow-orange-500/20 hover:border-orange-500/30 hover:transform hover:-translate-y-1">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Create Your Account
            </h2>
            <p className="text-slate-300">
              Join as a {accountType === 'user' ? 'user' : 'HR professional'}
            </p>
          </div>

          {/* Account Type Toggle */}
          <div className="flex bg-slate-700 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setAccountType('user')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                accountType === 'user'
                  ? 'bg-orange-500 text-white shadow-sm hover:bg-orange-600'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              User Account
            </button>
            <button
              type="button"
              onClick={() => setAccountType('hr')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                accountType === 'hr'
                  ? 'bg-orange-500 text-white shadow-sm hover:bg-orange-600'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              HR Account
            </button>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-slate-200 mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all hover:bg-slate-700/80 hover:border-slate-500 hover:shadow-lg"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-slate-200 mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all hover:bg-slate-700/80 hover:border-slate-500 hover:shadow-lg"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all hover:bg-slate-700/80 hover:border-slate-500 hover:shadow-lg"
                placeholder="Enter your email address"
              />
            </div>

            {/* HR-specific fields */}
            {accountType === 'hr' && (
              <>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-200 mb-2">
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all hover:bg-slate-700/80 hover:border-slate-500 hover:shadow-lg"
                    placeholder="Enter your company name"
                  />
                </div>
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-slate-200 mb-2">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    required
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  >
                    <option value="">Select your department</option>
                    <option value="hr">Human Resources</option>
                    <option value="recruitment">Recruitment</option>
                    <option value="talent-management">Talent Management</option>
                    <option value="employee-relations">Employee Relations</option>
                    <option value="compensation">Compensation & Benefits</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </>
            )}

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all hover:bg-slate-700/80 hover:border-slate-500 hover:shadow-lg"
                  placeholder="Create a password"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-200 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all hover:bg-slate-700/80 hover:border-slate-500 hover:shadow-lg"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                required
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-slate-600 rounded mt-1 bg-slate-700"
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-slate-200">
                I agree to the{' '}
                <Link href="/terms" className="text-orange-400 hover:text-orange-300">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-orange-400 hover:text-orange-300">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:scale-105 disabled:hover:translate-y-0 disabled:hover:scale-100"
            >
              {isLoading ? 'Creating Account...' : `Create ${accountType === 'user' ? 'User' : 'HR'} Account`}
            </button>
          </form>

          {/* Social Signup - Only for Users */}
          {accountType === 'user' && (
            <>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-slate-800 text-slate-400">Or sign up with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialSignup('google')}
                    disabled={isLoading}
                    className="w-full inline-flex justify-center py-2 px-4 border border-slate-600 rounded-lg shadow-sm bg-slate-700 text-sm font-medium text-slate-200 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:scale-105 disabled:hover:translate-y-0 disabled:hover:scale-100"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="ml-2">Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialSignup('facebook')}
                    disabled={isLoading}
                    className="w-full inline-flex justify-center py-2 px-4 border border-slate-600 rounded-lg shadow-sm bg-slate-700 text-sm font-medium text-slate-200 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:scale-105 disabled:hover:translate-y-0 disabled:hover:scale-100"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="ml-2">Facebook</span>
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialSignup('github')}
                    disabled={isLoading}
                    className="w-full inline-flex justify-center py-2 px-4 border border-slate-600 rounded-lg shadow-sm bg-slate-700 text-sm font-medium text-slate-200 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:scale-105 disabled:hover:translate-y-0 disabled:hover:scale-100"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="ml-2">GitHub</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialSignup('linkedin')}
                    disabled={isLoading}
                    className="w-full inline-flex justify-center py-2 px-4 border border-slate-600 rounded-lg shadow-sm bg-slate-700 text-sm font-medium text-slate-200 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:scale-105 disabled:hover:translate-y-0 disabled:hover:scale-100"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 c0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="ml-2">LinkedIn</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-300">
              Already have an account?{' '}
              <Link href="/" className="text-orange-400 hover:text-orange-300 font-medium transition-all duration-300 hover:underline hover:scale-105">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
