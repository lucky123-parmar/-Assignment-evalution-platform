# EvalEra - Smart Assignment Evaluation System

A comprehensive web application for students and teachers to manage assignments, submissions, and automated evaluations using AI.

## 🚀 Features

- **User Authentication**: Secure login/register system for students and teachers
- **Assignment Management**: Create, edit, and manage assignments
- **Code Submission**: Students can submit code assignments
- **AI-Powered Evaluation**: Automated code evaluation using AI
- **Real-time Dashboard**: Track submissions, evaluations, and scores
- **Code Editor**: Built-in code editor for writing and testing code
- **Profile Management**: Update user profiles and preferences

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Google Generative AI** for code evaluation
- **bcryptjs** for password hashing

### Frontend
- **HTML5** with modern CSS
- **Vanilla JavaScript** (ES6+)
- **Font Awesome** for icons
- **Responsive Design**

## 📋 Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v14 or higher)
2. **MongoDB** installed and running locally
3. **npm** or **yarn** package manager

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd EvalEra
```

### 2. Install Dependencies
```bash
npm run setup
```

### 3. Start the Application
```bash
npm start
```

This will start both the backend (port 5000) and frontend (port 3000) servers.

## 🔧 Manual Setup

### Backend Setup
```bash
cd Backend
npm install
node server.js
```

### Frontend Setup
```bash
cd Frontend
npx http-server -p 3000 -o
```

## 📁 Project Structure

```
EvalEra/
├── Backend/
│   ├── Routes/
│   │   ├── Controllers/
│   │   └── Routing/
│   ├── Schema/
│   ├── middleware/
│   ├── server.js
│   └── package.json
├── Frontend/
│   ├── js/
│   ├── pages/
│   ├── Assets/
│   └── index.html
├── start.js
└── package.json
```

## 🔐 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/me` - Get current user

### Assignments
- `GET /api/assignments` - Get all assignments
- `POST /api/assignments` - Create assignment
- `GET /api/assignments/:id` - Get assignment by ID
- `PATCH /api/assignments/:id` - Update assignment
- `DELETE /api/assignments/:id` - Delete assignment

### Submissions
- `GET /api/submissions` - Get all submissions
- `POST /api/submissions` - Create submission
- `GET /api/submissions/:id` - Get submission by ID
- `PATCH /api/submissions/:id` - Update submission

### Evaluations
- `GET /api/evaluations` - Get all evaluations
- `POST /api/evaluations` - Create evaluation
- `GET /api/evaluations/:id` - Get evaluation by ID

### AI Services
- `POST /api/ai/evaluate/:submissionId` - Evaluate submission
- `POST /api/ai/feedback/:submissionId` - Generate feedback

## 👥 User Roles

### Student
- View available assignments
- Submit code assignments
- View evaluation results
- Track submission history

### Teacher
- Create and manage assignments
- View all submissions
- Evaluate submissions (manual/AI)
- Generate reports

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the Backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/EvalEra
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

### MongoDB Setup
1. Install MongoDB locally
2. Start MongoDB service
3. Create database: `EvalEra`

## 🚀 Usage

1. **Register/Login**: Create an account or login
2. **Student Flow**:
   - View assignments on dashboard
   - Submit code using the code editor
   - Track evaluation results
3. **Teacher Flow**:
   - Create new assignments
   - View student submissions
   - Evaluate submissions manually or using AI
   - Generate feedback

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in config.js

2. **Port Already in Use**
   - Change port in config.js
   - Kill existing processes

3. **CORS Errors**
   - Backend CORS is configured for localhost:3000
   - Check frontend URL configuration

4. **Authentication Issues**
   - Clear browser localStorage
   - Check JWT token expiration

## 📝 Development

### Adding New Features
1. Create backend routes in `Backend/Routes/Routing/`
2. Add controllers in `Backend/Routes/Controllers/`
3. Update frontend API calls in `Frontend/js/api.js`
4. Add UI components in `Frontend/pages/`

### Code Style
- Use ES6+ features
- Follow consistent naming conventions
- Add proper error handling
- Include JSDoc comments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

---

**EvalEra** - Making assignment evaluation smarter and more efficient! 🎓 