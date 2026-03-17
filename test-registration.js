// Test registration endpoint
const fetch = require('node-fetch');

async function testRegistration() {
  try {
    console.log('🧪 Testing registration endpoint...');
    
    const testUser = {
      name: 'Test User',
      username: 'testuser123',
      email: 'test@example.com',
      password: 'testpassword123',
      universityRollNo: 'TEST123',
      role: 'student'
    };
    
    const response = await fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testUser)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Registration successful!');
      console.log('Response:', data);
    } else {
      console.log('❌ Registration failed:', data);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testRegistration(); 