const mongoose = require('mongoose');
const crypto = require('crypto');

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
  },
  salt: String
});

userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(this.password, this.salt, SALT_WORK_FACTOR, 64, 'sha512').toString('hex');
  }
});

userSchema.methods.comparePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, SALT_WORK_FACTOR, 64, 'sha512').toString('hex');
  return this.password === hash;
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;