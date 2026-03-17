const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up EvalEra Project...\n');

// Check if Node.js is installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' });
  console.log('✅ Node.js version:', nodeVersion.trim());
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js first.');
  process.exit(1);
}

// Check if npm is installed
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' });
  console.log('✅ npm version:', npmVersion.trim());
} catch (error) {
  console.error('❌ npm is not installed. Please install npm first.');
  process.exit(1);
}

// Install backend dependencies
console.log('\n📦 Installing Backend Dependencies...');
try {
  execSync('npm install', { 
    cwd: path.join(__dirname, 'Backend'),
    stdio: 'inherit'
  });
  console.log('✅ Backend dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install backend dependencies:', error.message);
  process.exit(1);
}

// Install root dependencies
console.log('\n📦 Installing Root Dependencies...');
try {
  execSync('npm install', { 
    cwd: __dirname,
    stdio: 'inherit'
  });
  console.log('✅ Root dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install root dependencies:', error.message);
  process.exit(1);
}

// Check if MongoDB is running
console.log('\n🗄️ Checking MongoDB Connection...');
try {
  // Try to connect to MongoDB
  const mongoose = require('mongoose');
  const config = require('./Backend/config');
  
  mongoose.connect(config.MONGODB_URI, { 
    serverSelectionTimeoutMS: 5000 
  }).then(() => {
    console.log('✅ MongoDB connection successful');
    mongoose.connection.close();
  }).catch((error) => {
    console.warn('⚠️ MongoDB connection failed:', error.message);
    console.log('💡 Please make sure MongoDB is installed and running');
    console.log('💡 You can install MongoDB from: https://docs.mongodb.com/manual/installation/');
  });
} catch (error) {
  console.warn('⚠️ Could not test MongoDB connection:', error.message);
}

// Create necessary directories if they don't exist
console.log('\n📁 Checking Project Structure...');
const dirs = [
  'Backend/logs',
  'Frontend/js',
  'Frontend/pages',
  'Frontend/Assets'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  } else {
    console.log(`✅ Directory exists: ${dir}`);
  }
});

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next Steps:');
console.log('1. Make sure MongoDB is running');
console.log('2. Run: npm start');
console.log('3. Open http://localhost:3000 in your browser');
console.log('4. Register a new account and start using EvalEra!');
console.log('\n💡 For testing, run: node test-integration.js'); 