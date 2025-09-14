import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import GitHubProvider from 'next-auth/providers/github'
import LinkedInProvider from 'next-auth/providers/linkedin'

// Only include providers that have environment variables set
const providers = []

// Check if environment variables are properly set (not placeholder values)
const isGoogleConfigured = process.env.GOOGLE_CLIENT_ID && 
  process.env.GOOGLE_CLIENT_SECRET && 
  !process.env.GOOGLE_CLIENT_ID.includes('your-google-client-id') &&
  !process.env.GOOGLE_CLIENT_ID.includes('123456789-abcdefghijklmnopqrstuvwxyz123456')

const isFacebookConfigured = process.env.FACEBOOK_CLIENT_ID && 
  process.env.FACEBOOK_CLIENT_SECRET && 
  !process.env.FACEBOOK_CLIENT_ID.includes('your-facebook-client-id')

const isGitHubConfigured = process.env.GITHUB_CLIENT_ID && 
  process.env.GITHUB_CLIENT_SECRET && 
  !process.env.GITHUB_CLIENT_ID.includes('your-github-client-id')

const isLinkedInConfigured = process.env.LINKEDIN_CLIENT_ID && 
  process.env.LINKEDIN_CLIENT_SECRET && 
  !process.env.LINKEDIN_CLIENT_ID.includes('your-linkedin-client-id')

if (isGoogleConfigured) {
  providers.push(GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }))
}

if (isFacebookConfigured) {
  providers.push(FacebookProvider({
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  }))
}

if (isGitHubConfigured) {
  providers.push(GitHubProvider({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  }))
}

if (isLinkedInConfigured) {
  providers.push(LinkedInProvider({
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  }))
}

const handler = NextAuth({
  providers,
  callbacks: {
    async signIn({ user, account, profile }) {
      // You can add custom logic here to determine if user should be allowed to sign in
      return true
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token.accessToken) {
        (session as any).accessToken = token.accessToken
      }
      return session
    },
  },
  pages: {
    signIn: '/',
  },
})

export { handler as GET, handler as POST }
