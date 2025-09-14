import { NextResponse } from 'next/server';

export async function GET() {
  // Check which providers have environment variables set
  const providers = {
    google: process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
    facebook: process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET,
    github: process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET,
    linkedin: process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET,
  };

  // Return the providers that are configured
  return NextResponse.json(providers);
}