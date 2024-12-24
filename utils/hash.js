import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = (password) => {
  const saltRounds = 10;

  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
};

export const comparePassword = (password, hash) => {
  const compare = bcrypt.compareSync(password, hash);
  return compare;
};

export const createToken = (id) => {
  const token = jwt.sign({ id }, "ptdqcpassword");
  return token;
};
