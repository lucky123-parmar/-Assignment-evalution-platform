const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting EvalEra Application...\n');

// Start backend server
console.log('📡 Starting Backend Server...');
const backend = spawn('node', ['server.js'], {
  cwd: path.join(__dirname, 'Backend'),
  stdio: 'inherit'
});

backend.on('error', (error) => {
  console.error('❌ Backend server error:', error);
});

backend.on('close', (code) => {
  console.log(`📡 Backend server exited with code ${code}`);
});

// Start frontend server (using a simple HTTP server)
console.log('🌐 Starting Frontend Server...');
const frontend = spawn('npx', ['http-server', 'Frontend', '-p', '3000', '-o'], {
  stdio: 'inherit'
});

frontend.on('error', (error) => {
  console.error('❌ Frontend server error:', error);
});

frontend.on('close', (code) => {
  console.log(`🌐 Frontend server exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down servers...');
  backend.kill();
  frontend.kill();
  process.exit();
});

console.log('\n✅ Servers started successfully!');
console.log('📡 Backend: http://localhost:5000');
console.log('🌐 Frontend: http://localhost:3000');
console.log('\nPress Ctrl+C to stop all servers'); 