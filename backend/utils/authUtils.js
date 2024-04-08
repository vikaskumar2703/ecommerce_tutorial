import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    console.log(`Error occured in hashing password : ${err}`);
  }
};

export const comparePassword = (password, hashedPassword) => {
  try {
    return bcrypt.compare(password, hashedPassword);
  } catch (err) {
    console.log(
      `Error occured in comparing entered password with hash password : ${err}`
    );
  }
};
