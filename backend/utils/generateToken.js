import jwt from "jsonwebtoken";

const generateToken = (id) => {
  // takes user id
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // returns it in the form of an encrypted token
    expiresIn: "30d",
  });
};

export default generateToken;
