// Simple test to verify backend is working
const fetch = require('node-fetch');

async function testBackend() {
  try {
    console.log('🧪 Testing backend connection...');
    
    const response = await fetch('http://localhost:5000');
    const data = await response.text();
    
    console.log('✅ Backend is running!');
    console.log('Response:', data);
    
  } catch (error) {
    console.error('❌ Backend test failed:', error.message);
  }
}

testBackend(); 