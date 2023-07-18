// models.js
module.exports = (mongoose) => {
  const userSchema = mongoose.Schema({

    user_id: String,
    name: String,
    email: String,
    age: Number,
    location: String,
  });

  return mongoose.model('user', userSchema);
};