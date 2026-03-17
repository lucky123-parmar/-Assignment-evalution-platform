const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  submissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  evaluatorType: { type: String, enum: ['teacher', 'ai'], required: true },
  evaluatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  feedback: { type: String, minlength: 5 },
  suggestions: { type: [String], default: [] },
  score: { type: Number, min: 0, max: 100, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Evaluation', evaluationSchema);
