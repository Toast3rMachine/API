const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: Boolean, default: false}, //Si false alors User sinon Admin
});

const User = mongoose.model('user', UserSchema);

module.exports = User;