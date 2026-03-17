// Test script to verify backend-frontend integration
const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5000/api';

async function testBackendConnection() {
  console.log('🧪 Testing Backend Connection...\n');
  
  try {
    // Test health check
    const healthResponse = await fetch(`${API_BASE_URL.replace('/api', '')}`);
    const healthData = await healthResponse.text();
    console.log('✅ Health Check:', healthData);
    
    // Test user registration
    const testUser = {
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword123',
      universityRollNo: 'TEST123',
      role: 'student'
    };
    
    console.log('\n📝 Testing User Registration...');
    const registerResponse = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    
    const registerData = await registerResponse.json();
    if (registerResponse.ok) {
      console.log('✅ Registration successful');
    } else {
      console.log('⚠️ Registration response:', registerData);
    }
    
    // Test user login
    console.log('\n🔐 Testing User Login...');
    const loginResponse = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password
      })
    });
    
    const loginData = await loginResponse.json();
    if (loginResponse.ok) {
      console.log('✅ Login successful');
      console.log('🔑 Token received:', loginData.token ? 'Yes' : 'No');
      console.log('👤 User data received:', loginData.user ? 'Yes' : 'No');
    } else {
      console.log('❌ Login failed:', loginData);
    }
    
    console.log('\n🎉 Integration test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure your backend server is running on port 5000');
  }
}

// Run the test
testBackendConnection(); 