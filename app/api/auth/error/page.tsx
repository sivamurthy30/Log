'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return {
          title: 'OAuth Not Configured',
          message: 'The OAuth provider is not properly configured. Please check your environment variables.',
          solution: 'Contact your administrator or check the setup documentation.'
        };
      case 'AccessDenied':
        return {
          title: 'Access Denied',
          message: 'You denied access to the OAuth provider.',
          solution: 'Please try again and grant the necessary permissions.'
        };
      case 'Verification':
        return {
          title: 'Verification Failed',
          message: 'The OAuth token could not be verified.',
          solution: 'Please try logging in again.'
        };
      case 'OAuthSignin':
        return {
          title: 'OAuth Sign-in Error',
          message: 'There was an error during the OAuth sign-in process.',
          solution: 'Please check your OAuth configuration and try again.'
        };
      case 'OAuthCallback':
        return {
          title: 'OAuth Callback Error',
          message: 'There was an error in the OAuth callback.',
          solution: 'Please try logging in again.'
        };
      case 'OAuthCreateAccount':
        return {
          title: 'Account Creation Error',
          message: 'Could not create account with OAuth provider.',
          solution: 'Please try a different sign-in method.'
        };
      case 'EmailCreateAccount':
        return {
          title: 'Email Account Error',
          message: 'Could not create account with this email.',
          solution: 'Please try a different email or sign-in method.'
        };
      case 'Callback':
        return {
          title: 'Callback Error',
          message: 'There was an error in the authentication callback.',
          solution: 'Please try logging in again.'
        };
      case 'OAuthAccountNotLinked':
        return {
          title: 'Account Not Linked',
          message: 'This email is already associated with a different account.',
          solution: 'Please sign in with the original method or use a different email.'
        };
      case 'EmailSignin':
        return {
          title: 'Email Sign-in Error',
          message: 'There was an error sending the verification email.',
          solution: 'Please try again or contact support.'
        };
      case 'CredentialsSignin':
        return {
          title: 'Invalid Credentials',
          message: 'The email or password you entered is incorrect.',
          solution: 'Please check your credentials and try again.'
        };
      case 'SessionRequired':
        return {
          title: 'Session Required',
          message: 'You must be signed in to access this page.',
          solution: 'Please sign in to continue.'
        };
      default:
        return {
          title: 'Authentication Error',
          message: 'An unexpected error occurred during authentication.',
          solution: 'Please try again or contact support if the problem persists.'
        };
    }
  };

  const errorInfo = getErrorMessage(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-8">
          {/* Error Icon */}
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {errorInfo.title}
            </h1>
            <p className="text-slate-300 text-sm">
              {errorInfo.message}
            </p>
          </div>

          {/* Solution */}
          <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-slate-200 mb-2">
              💡 Solution:
            </h3>
            <p className="text-slate-300 text-sm">
              {errorInfo.solution}
            </p>
          </div>

          {/* Error Details */}
          {error && (
            <div className="bg-slate-700/30 rounded-lg p-3 mb-6">
              <h4 className="text-xs font-medium text-slate-400 mb-1">
                Error Code:
              </h4>
              <code className="text-red-400 text-sm">
                {error}
              </code>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/"
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-all text-center block"
            >
              Try Again
            </Link>
            
            <Link
              href="/test-oauth"
              className="w-full bg-slate-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-slate-500 transition-all text-center block text-sm"
            >
              Check OAuth Status
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              Need help? Check the{' '}
              <Link href="/GOOGLE_OAUTH_SETUP.md" className="text-orange-400 hover:text-orange-300">
                setup guide
              </Link>
              {' '}or contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
