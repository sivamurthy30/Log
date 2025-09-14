'use client';

import { signIn, getProviders } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function TestOAuth() {
  const [providers, setProviders] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
      setLoading(false);
    };
    fetchProviders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="text-white text-xl">Loading providers...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-8">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            OAuth Providers Test
          </h1>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">
              Available Providers:
            </h2>
            
            {providers && Object.keys(providers).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(providers).map((provider: any) => (
                  <div key={provider.name} className="bg-slate-700 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-2">
                      {provider.name}
                    </h3>
                    <p className="text-green-400 text-sm mb-3">
                      ✅ Configured and ready
                    </p>
                    <button
                      onClick={() => signIn(provider.id, { callbackUrl: '/dashboard' })}
                      className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-all"
                    >
                      Test {provider.name} Login
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
                <h3 className="text-red-400 font-medium mb-2">
                  ⚠️ No OAuth providers configured
                </h3>
                <p className="text-slate-300 text-sm">
                  Please check your .env.local file and add OAuth credentials for the providers you want to use.
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-slate-700 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-2">
              Environment Variables Status:
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">Google:</span>
                <span className={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? 'text-green-400' : 'text-red-400'}>
                  {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Not set'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Facebook:</span>
                <span className={process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID ? 'text-green-400' : 'text-red-400'}>
                  {process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID ? '✅ Set' : '❌ Not set'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">GitHub:</span>
                <span className={process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ? 'text-green-400' : 'text-red-400'}>
                  {process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ? '✅ Set' : '❌ Not set'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">LinkedIn:</span>
                <span className={process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID ? 'text-green-400' : 'text-red-400'}>
                  {process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID ? '✅ Set' : '❌ Not set'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a 
              href="/" 
              className="text-orange-400 hover:text-orange-300 font-medium"
            >
              ← Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
