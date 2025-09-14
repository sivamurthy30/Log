# 🔐 Next.js Login Application

A modern, secure login system built with Next.js 15, NextAuth.js, and Tailwind CSS. Features both user and HR authentication with OAuth integration support.

## ✨ Features

- **🔑 Dual Authentication**: Separate login flows for users and HR personnel
- **🌐 OAuth Integration**: Support for Google, Facebook, GitHub, and LinkedIn
- **🎨 Modern UI**: Dark theme with orange accents and responsive design
- **📱 Mobile-First**: Fully responsive design that works on all devices
- **🛡️ Security**: NextAuth.js integration with secure session management
- **📝 Form Validation**: Client-side and server-side validation
- **🚀 Performance**: Built with Next.js 15 and Turbopack for fast development

## 🏗️ Project Structure

```
login/
├── app/
│   ├── api/
│   │   ├── auth/           # NextAuth.js configuration
│   │   └── hr/             # HR-specific API endpoints
│   ├── dashboard/          # User dashboard
│   ├── hr-dashboard/       # HR dashboard
│   ├── jobs/               # Job management pages
│   ├── signin/             # Registration page
│   └── test-oauth/         # OAuth testing page
├── public/                 # Static assets
├── types/                  # TypeScript type definitions
└── setup-*.js             # OAuth configuration scripts
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sivamurthy30/Log.git
   cd Log
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your OAuth credentials to `.env.local`:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   # Add other OAuth providers as needed
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 OAuth Setup

### Google OAuth (Recommended)

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
7. Copy the Client ID and Client Secret to your `.env.local` file
8. Restart the development server

### Other OAuth Providers

The application supports Facebook, GitHub, and LinkedIn OAuth. Follow similar setup procedures for each provider and add the credentials to your `.env.local` file.

## 📱 Available Pages

| Page | URL | Description |
|------|-----|-------------|
| **Main Login** | `/` | User/HR login with OAuth options |
| **Signup** | `/signin` | User registration forms |
| **User Dashboard** | `/dashboard` | Protected user area |
| **HR Dashboard** | `/hr-dashboard` | Protected HR area |
| **Job Management** | `/jobs/*` | Job creation and management |
| **OAuth Test** | `/test-oauth` | Check OAuth provider status |
| **Clean Interface** | `/test-clean.html` | Minimal UI for testing |

## 🛠️ Development

### Available Scripts

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: NextAuth.js v4
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Build Tool**: Turbopack (for faster development)

## 🔒 Security Features

- **Session Management**: Secure JWT-based sessions
- **CSRF Protection**: Built-in CSRF protection via NextAuth.js
- **Environment Variables**: Sensitive data stored in environment variables
- **Input Validation**: Client and server-side validation
- **HTTPS Ready**: Production-ready security configurations

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🧪 Testing

### OAuth Status Check
Visit `/test-oauth` to see which OAuth providers are properly configured.

### Clean Interface
Visit `/test-clean.html` for a minimal interface without styling for testing purposes.

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Google OAuth Setup Guide](./GOOGLE_OAUTH_SETUP.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Quick Start Guide](./QUICK_START.md)
2. Review the [Google OAuth Setup Guide](./GOOGLE_OAUTH_SETUP.md)
3. Open an issue on GitHub
4. Check the OAuth status at `/test-oauth`

## 🎯 Roadmap

- [ ] Add more OAuth providers
- [ ] Implement password reset functionality
- [ ] Add two-factor authentication
- [ ] Create admin dashboard
- [ ] Add user profile management
- [ ] Implement role-based access control

---

**Happy coding! 🚀**