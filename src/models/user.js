const mongoose = require('../database/config');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstName:{
    type:String,
    require:true,
  },
  lastName:{
    type:String,
    require:true,
  },
  email:{
    type:String,
    require:true,
    unique:true,
    lowercase:true,
  },
  password:{
    type:String,
    require:true,
    select:false,
  },
  createdAt:{
    type:Date,
    default:Date.now,
  },
});

UserSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
