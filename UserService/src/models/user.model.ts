import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: false },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: mongoose.Schema.Types.ObjectId, ref: 'Gender'},
    isSeller: { type: Boolean, default: false, required: true },
    seller: {
      name: String,
      logo: String,
      description: String,
      rating: { type: Number, default: 0, required: true },
      numReviews: { type: Number, default: 0, required: true },
    },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
    isDeleted: { type: Boolean, default: false, required: false },
    online: { type: Boolean, default: false, required: false }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;