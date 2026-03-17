// Comprehensive test for all endpoints
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testCompleteFlow() {
  try {
    console.log('🧪 Testing complete flow...\n');
    
    // Test 1: Health check
    console.log('1️⃣ Testing health check...');
    const healthResponse = await fetch('http://localhost:5000');
    const healthData = await healthResponse.text();
    console.log('✅ Health check:', healthData);
    
    // Test 2: Registration
    console.log('\n2️⃣ Testing registration...');
    const testUser = {
      name: 'Test User',
      username: 'testuser' + Date.now(),
      email: 'test' + Date.now() + '@example.com',
      password: 'testpassword123',
      universityRollNo: 'TEST' + Date.now(),
      role: 'student'
    };
    
    const registerResponse = await fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    
    const registerData = await registerResponse.json();
    if (registerResponse.ok) {
      console.log('✅ Registration successful');
    } else {
      console.log('❌ Registration failed:', registerData);
      return;
    }
    
    // Test 3: Login
    console.log('\n3️⃣ Testing login...');
    const loginResponse = await fetch('http://localhost:5000/api/users/login', {
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
      
      // Test 4: Get user profile (authenticated)
      console.log('\n4️⃣ Testing authenticated endpoint...');
      const profileResponse = await fetch('http://localhost:5000/api/users/me', {
        headers: {
          'Authorization': `Bearer ${loginData.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const profileData = await profileResponse.json();
      if (profileResponse.ok) {
        console.log('✅ Profile fetch successful');
        console.log('👤 User:', profileData.name);
      } else {
        console.log('❌ Profile fetch failed:', profileData);
      }
      
    } else {
      console.log('❌ Login failed:', loginData);
    }
    
    console.log('\n🎉 All tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testCompleteFlow(); 