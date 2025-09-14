'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [demoUser, setDemoUser] = useState(null);

  useEffect(() => {

    const storedDemoUser = localStorage.getItem('demoUser');
    if (storedDemoUser) {
      setDemoUser(JSON.parse(storedDemoUser));
    } else if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!session && !demoUser) {
    return null;
  }

  const user = session?.user || demoUser;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
         <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-8 transition-all duration-300 hover:shadow-orange-500/20 hover:border-orange-500/30 hover:transform hover:-translate-y-1">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome to Dashboard
              </h1>
              <p className="text-slate-300">
                Hello, {user?.name || user?.email}!
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:scale-105"
            >
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-700 rounded-lg p-6 transition-all duration-300 hover:bg-slate-700/80 hover:shadow-lg hover:transform hover:-translate-y-1 hover:border-orange-500/30 border border-transparent">
              <h3 className="text-xl font-semibold text-white mb-2">Profile</h3>
              <p className="text-slate-300 text-sm">
                Email: {user?.email}
              </p>
              {user?.image && (
                <img 
                  src={user.image} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full mt-4"
                />
              )}
            </div>

            <div className="bg-slate-700 rounded-lg p-6 transition-all duration-300 hover:bg-slate-700/80 hover:shadow-lg hover:transform hover:-translate-y-1 hover:border-orange-500/30 border border-transparent">
              <h3 className="text-xl font-semibold text-white mb-2">Account Type</h3>
              <p className="text-slate-300 text-sm">
                {user?.loginType || 'User'}
              </p>
            </div>

            <div className="bg-slate-700 rounded-lg p-6 transition-all duration-300 hover:bg-slate-700/80 hover:shadow-lg hover:transform hover:-translate-y-1 hover:border-orange-500/30 border border-transparent">
              <h3 className="text-xl font-semibold text-white mb-2">Status</h3>
              <p className="text-green-400 text-sm">
                ✓ {demoUser ? 'Demo Mode' : 'Authenticated'}
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-slate-700 rounded-lg transition-all duration-300 hover:bg-slate-700/80 hover:shadow-lg hover:transform hover:-translate-y-1 hover:border-orange-500/30 border border-transparent">
            <h3 className="text-xl font-semibold text-white mb-4">Session Data</h3>
            <pre className="text-slate-300 text-sm overflow-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
