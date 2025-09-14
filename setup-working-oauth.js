#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🚀 Setting up WORKING OAuth configuration...\n');

// Generate a random secret for NextAuth
const nextAuthSecret = crypto.randomBytes(32).toString('base64');

// Create .env.local file with working configuration
const envContent = `# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=${nextAuthSecret}

# Google OAuth - Test Configuration
# IMPORTANT: Replace these with your real Google OAuth credentials
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz123456

# Other providers (placeholder values)
FACEBOOK_CLIENT_ID=your-facebook-client-id-here
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret-here

GITHUB_CLIENT_ID=your-github-client-id-here
GITHUB_CLIENT_SECRET=your-github-client-secret-here

LINKEDIN_CLIENT_ID=your-linkedin-client-id-here
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret-here
`;

const envPath = path.join(__dirname, '.env.local');

try {
  fs.writeFileSync(envPath, envContent);
  
  console.log('✅ Created .env.local file with OAuth configuration');
  console.log('🔧 NextAuth secret generated:', nextAuthSecret);
  console.log('\n📝 IMPORTANT: To make OAuth work, you need real credentials!');
  console.log('\n🔑 For Google OAuth (Easiest to set up):');
  console.log('1. Go to https://console.developers.google.com/');
  console.log('2. Create a new project or select existing one');
  console.log('3. Enable Google+ API');
  console.log('4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"');
  console.log('5. Set application type to "Web application"');
  console.log('6. Add authorized redirect URI: http://localhost:3000/api/auth/callback/google');
  console.log('7. Copy the Client ID and Client Secret');
  console.log('8. Replace the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local');
  console.log('\n🚀 Run "npm run dev" to start the server');
  console.log('💡 The OAuth buttons will show helpful error messages until you add real credentials');
  
} catch (error) {
  console.error('❌ Error creating .env.local:', error.message);
  console.log('\n📝 Please create .env.local manually with the following content:');
  console.log(envContent);
}
