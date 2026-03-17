const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  submittedAt: { type: Date, default: Date.now },
  repoLink: { type: String, default: null },
  fileUrl: { type: String, required: true },
  comment: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
