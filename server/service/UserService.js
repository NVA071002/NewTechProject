const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwtService = require("./JwtService");

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
      // console.log(hashPassword);
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
        console.log(`error`);
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
        id: existedUser.id,
        username: existedUser.username,
        password: existedUser.password,
        role: existedUser.role,
      });

      console.log(access_token);
      const refresh_token = await jwtService.generalRefreshToken({
        id: existedUser.id,
        username: existedUser.username,
        password: existedUser.password,
        role: existedUser.role,
      });
      resolve({
        status: "OK",
        message: "LOGIN SUCESS",
        access_token: access_token,
        refresh_token: refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const update = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existedUser = await UserModel.findOne({
        _id: id,
      });
      // console.log('existed User', existedUser);
      if (existedUser === null) {
        resolve({
          status: 200,
          message: "Username is not existed",
        });
      }
      const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      console.log("updatedUser", updatedUser);

      resolve({
        status: "OK",
        message: "UPDATE_SUCESS",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existedUser = await UserModel.findOne({
        _id: id,
      });
      // console.log('existed User', existedUser);
      if (existedUser === null) {
        resolve({
          status: 200,
          message: "Username is not existed",
        });
      }
      const deletedUser = await UserModel.findByIdAndDelete(id, data, {
        new: true,
      });
      console.log("deletedUser", deletedUser);

      resolve({
        status: "OK",
        message: "DELETE_SUCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await UserModel.find();
      resolve({
        status: "OK",
        message: "SUCESS",
        data: allUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existedUser = await UserModel.findOne({
        _id: id,
      });
      // console.log('existed User', existedUser);
      if (existedUser === null) {
        resolve({
          status: 200,
          message: "User is not existed",
        });
      }
      resolve({
        status: "OK",
        message: "SUCESS",
        data: existedUser
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createUser,
  loginUser,
  update,
  deleteUser,
  getAll,
  getDetailUser
};
