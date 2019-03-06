const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    unique: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
  }
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;