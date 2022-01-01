import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true, // to track when the field was created in db and when was it updated
  }
);

// decrypts password
userSchema.methods.matchPassword = async function (enteredPassword) {
  // compares password enetred by user to the one saved in db
  return await bcrypt.compare(enteredPassword, this.password);
};

// encrypts password everytime it is saved
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // if it's not modified, it moves on to next
    next();
  }
  const salt = await bcrypt.genSalt(10); // generating unique salt
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
