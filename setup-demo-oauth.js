#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up DEMO OAuth for immediate testing...\n');

// Create a demo .env.local with working Google OAuth
const envContent = `# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=Kt0FhE3cWAhxw/gCpFNv1A34y75OhVEUMLF/wKUubQU=

# DEMO Google OAuth (This is a demo client ID - replace with your own for production)
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz123456

# Other providers (set to placeholder values - not configured)
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
  
  console.log('✅ Created demo .env.local file');
  console.log('⚠️  IMPORTANT: The Google OAuth credentials are DEMO values');
  console.log('📝 To make OAuth work, you need to:');
  console.log('1. Go to https://console.developers.google.com/');
  console.log('2. Create a new project');
  console.log('3. Enable Google+ API');
  console.log('4. Create OAuth 2.0 credentials');
  console.log('5. Replace the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local');
  console.log('\n🔧 For now, the app will show "not configured" messages for OAuth buttons');
  console.log('🚀 Run "npm run dev" to start the server');
  
} catch (error) {
  console.error('❌ Error creating .env.local:', error.message);
}
