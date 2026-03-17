const Assignment = require('../../Schema/assignment');

// Create a new assignment
exports.createAssignment = async (req, res) => {
  try {
    const { title, description, deadline, fileUrl } = req.body;

    const assignment = new Assignment({
      title,
      description,
      deadline,
      fileUrl,
      teacherId: req.user.id // assuming req.user is set via auth middleware
    });

    await assignment.save();
    res.status(201).json({ message: 'Assignment created successfully', assignment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all assignments
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().populate('teacherId', 'name email');
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get assignment by ID
exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id).populate('teacherId', 'name email');
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get assignments by teacher
exports.getAssignmentsByTeacher = async (req, res) => {
  try {
    const assignments = await Assignment.find({ teacherId: req.params.teacherId }).populate('teacherId', 'name email');
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update assignment
exports.updateAssignment = async (req, res) => {
  try {
    const updates = req.body;
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

    res.json({ message: 'Assignment updated successfully', assignment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete assignment
exports.deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
    res.json({ message: 'Assignment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
