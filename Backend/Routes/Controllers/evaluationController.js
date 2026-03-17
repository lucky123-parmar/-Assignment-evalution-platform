const Evaluation = require('../../Schema/evaluation');

// Create a new evaluation
exports.createEvaluation = async (req, res) => {
  try {
    const { submissionId, studentId, evaluatorType, evaluatorId, feedback, suggestions, score } = req.body;

    const evaluation = new Evaluation({
      submissionId,
      studentId,
      evaluatorType,
      evaluatorId: evaluatorType === 'teacher' ? evaluatorId : null,
      feedback,
      suggestions,
      score
    });

    await evaluation.save();
    res.status(201).json({ message: 'Evaluation submitted', evaluation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all evaluations
exports.getAllEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find()
      .populate('studentId', 'name email')
      .populate('submissionId', 'fileUrl')
      .populate('evaluatorId', 'name email');

    res.json(evaluations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get evaluation by ID
exports.getEvaluationById = async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id)
      .populate('studentId', 'name email')
      .populate('submissionId', 'fileUrl')
      .populate('evaluatorId', 'name email');

    if (!evaluation) return res.status(404).json({ error: 'Evaluation not found' });
    res.json(evaluation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get evaluations by submission
exports.getEvaluationsBySubmission = async (req, res) => {
  try {
    const evaluations = await Evaluation.find({ submissionId: req.params.submissionId })
      .populate('evaluatorId', 'name')
      .populate('studentId', 'name');

    res.json(evaluations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get evaluations by student
exports.getEvaluationsByStudent = async (req, res) => {
  try {
    const evaluations = await Evaluation.find({ studentId: req.params.studentId })
      .populate('submissionId', 'fileUrl');

    res.json(evaluations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update evaluation
exports.updateEvaluation = async (req, res) => {
  try {
    const updates = req.body;

    const evaluation = await Evaluation.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!evaluation) return res.status(404).json({ error: 'Evaluation not found' });

    res.json({ message: 'Evaluation updated', evaluation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete evaluation
exports.deleteEvaluation = async (req, res) => {
  try {
    const evaluation = await Evaluation.findByIdAndDelete(req.params.id);

    if (!evaluation) return res.status(404).json({ error: 'Evaluation not found' });

    res.json({ message: 'Evaluation deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
