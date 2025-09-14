#!/usr/bin/env node

// This script disables Console Ninja by setting environment variables
process.env.CONSOLE_NINJA_DISABLED = 'true';
process.env.DISABLE_CONSOLE_NINJA = 'true';

// Start Next.js without Console Ninja
const { spawn } = require('child_process');

console.log('🚫 Disabling Console Ninja...');
console.log('🚀 Starting Next.js development server...');

const child = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    CONSOLE_NINJA_DISABLED: 'true',
    DISABLE_CONSOLE_NINJA: 'true',
    NODE_OPTIONS: '--no-warnings'
  }
});

child.on('close', (code) => {
  console.log(`Server exited with code ${code}`);
});

child.on('error', (err) => {
  console.error('Failed to start server:', err);
});
