const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8},
  role: { type: String, enum: ['teacher', 'student'], required: true },
  universityRollNo: {
    type: String,
    required: function () {
      return this.role === 'student';
    },
    unique: true
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
