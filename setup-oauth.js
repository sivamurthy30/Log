#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🔧 Setting up OAuth for your login system...\n');

// Generate a random secret for NextAuth
const nextAuthSecret = crypto.randomBytes(32).toString('base64');

// Create .env.local file content
const envContent = `# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=${nextAuthSecret}

# Google OAuth (Get these from https://console.developers.google.com/)
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Facebook OAuth (Get these from https://developers.facebook.com/)
FACEBOOK_CLIENT_ID=your-facebook-client-id-here
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret-here

# GitHub OAuth (Get these from https://github.com/settings/developers)
GITHUB_CLIENT_ID=your-github-client-id-here
GITHUB_CLIENT_SECRET=your-github-client-secret-here

# LinkedIn OAuth (Get these from https://www.linkedin.com/developers/)
LINKEDIN_CLIENT_ID=your-linkedin-client-id-here
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret-here
`;

const envPath = path.join(__dirname, '.env.local');

try {
  // Check if .env.local already exists
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env.local already exists. Backing up to .env.local.backup');
    fs.copyFileSync(envPath, path.join(__dirname, '.env.local.backup'));
  }

  // Write the new .env.local file
  fs.writeFileSync(envPath, envContent);
  
  console.log('✅ Created .env.local file with NextAuth secret');
  console.log('🔑 NextAuth secret generated:', nextAuthSecret);
  console.log('\n📝 Next steps:');
  console.log('1. Edit .env.local and replace the placeholder values with your actual OAuth credentials');
  console.log('2. For Google: https://console.developers.google.com/');
  console.log('3. For Facebook: https://developers.facebook.com/');
  console.log('4. For GitHub: https://github.com/settings/developers');
  console.log('5. For LinkedIn: https://www.linkedin.com/developers/');
  console.log('\n🚀 Run "npm run dev" to start the development server');
  console.log('💡 You only need to configure the OAuth providers you want to use!');
  
} catch (error) {
  console.error('❌ Error creating .env.local:', error.message);
  console.log('\n📝 Please create .env.local manually with the following content:');
  console.log(envContent);
}
