const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwtService = require("./JwtService")

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    console.log(newUser);
    const { username, password } = newUser;
    try {
      const existedUser = await UserModel.findOne({
        username: username,
      });
      if (existedUser) {
        resolve({
          status: 200,
          message: "Username is already registered",
        });
      }
      const hashPassword = bcrypt.hashSync(password, 10);
      console.log(hashPassword);

      const createdUser = await UserModel.create({
        username,
        password: hashPassword,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "REGISTER SUCESS",
          data: createdUser,
        });
      } else {
        console.log(`error o day`);
      }
    } catch (e) {
      reject(e);
    }
  });
};
const loginUser = (loginInfor) => {
  return new Promise(async (resolve, reject) => {
    console.log(loginInfor);
    const { username, password } = loginInfor;
    try {
      const existedUser = await UserModel.findOne({
        username: username,
      });
      if (existedUser === null) {
        resolve({
          status: 200,
          message: "Username is not existed",
        });
      }
      const comparePassword = bcrypt.compareSync(
        password,
        existedUser.password
      );
      if (!comparePassword) {
        resolve({
          status: 200,
          message: "Username or Password is not corrected!",
        });
      }
      const access_token = await jwtService.generalAccessToken({
        username: existedUser.username,
        password: existedUser.password
      });

      console.log(access_token);
      const refresh_token = await jwtService.generalRefreshToken({
        username: existedUser.username,
        password: existedUser.password
      });
      resolve({
        status: "OK",
        message: "LOGIN SUCESS",
        access_token: access_token,
        refresh_token: refresh_token
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createUser,
  loginUser,
};
