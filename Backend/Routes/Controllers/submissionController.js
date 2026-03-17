const Submission = require('../../Schema/submission');

// Submit a new assignment
exports.submitAssignment = async (req, res) => {
  try {
    const { assignmentId, fileUrl, repoLink, comment } = req.body;

    const submission = new Submission({
      assignmentId,
      studentId: req.user.id, // from auth middleware
      fileUrl,
      repoLink,
      comment
    });

    await submission.save();
    res.status(201).json({ message: 'Submission successful', submission });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all submissions
exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate('studentId', 'name email')
      .populate('assignmentId', 'title');
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get submission by ID
exports.getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('studentId', 'name email')
      .populate('assignmentId', 'title');

    if (!submission) return res.status(404).json({ error: 'Submission not found' });
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get submissions for a specific assignment
exports.getSubmissionsByAssignment = async (req, res) => {
  try {
    const submissions = await Submission.find({ assignmentId: req.params.assignmentId })
      .populate('studentId', 'name email')
      .populate('assignmentId', 'title');
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get submissions by a specific student
exports.getSubmissionsByStudent = async (req, res) => {
  try {
    const submissions = await Submission.find({ studentId: req.params.studentId })
      .populate('assignmentId', 'title');
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a submission (repo link / comment)
exports.updateSubmission = async (req, res) => {
  try {
    const updates = req.body;

    const submission = await Submission.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!submission) return res.status(404).json({ error: 'Submission not found' });

    res.json({ message: 'Submission updated successfully', submission });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a submission
exports.deleteSubmission = async (req, res) => {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);
    if (!submission) return res.status(404).json({ error: 'Submission not found' });

    res.json({ message: 'Submission deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

