const mongoose = require('mongoose');
const connectDB = require('./db');
const User = require('./Schema/user');
const Assignment = require('./Schema/assignment');
const Submission = require('./Schema/submission');
const Evaluation = require('./Schema/evaluation');


const testAllCollections = async () => {
  await connectDB();

  const teacher = await User.create({
    name: "Teacher 1",
    username: "teacher1",
    email: "teacher1@example.com",
    password: "password123",
    role: "teacher"
  });

  const student = await User.create({
    name: "Student 1",
    username: "student1",
    email: "student1@example.com",
    password: "password123",
    role: "student",
    universityRollNo: "CSE20250123"
  });

  const assignment = await Assignment.create({
    title: "HTML Assignment",
    description: "Create a simple HTML page",
    teacherId: teacher._id,
    deadline: new Date("2025-06-30"),
    fileUrl: "uploads/html-task.pdf"
  });

  const submission = await Submission.create({
    assignmentId: assignment._id,
    studentId: student._id,
    repoLink: "https://github.com/student1/html-assignment",
    fileUrl: "uploads/submitted-html.zip",
    comment: "Please check"
  });

  const evaluation = await Evaluation.create({
    submissionId: submission._id,
    studentId: student._id,
    evaluatorType: "teacher",
    evaluatorId: teacher._id,
    feedback: "Well done!",
    suggestions: ["Add comments", "Use semantic tags"],
    score: 85
  });

  console.log("All collections tested successfully!");
  mongoose.disconnect();
};

testAllCollections();
