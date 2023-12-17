const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const generalAccessToken = async (payload) => {
  console.log(payload);
  const access_token = jwt.sign(
    {
      payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "1h" }
  );
  return access_token;
};

const generalRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "365d" }
  );
  return refresh_token;
};
const refreshTokenJwt =  (token) => {
  return new Promise( (resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          resolve({
            status: "ERROR",
            message: "Authentication",
          });
        }
        const { payload } = user;
        const newAccessToken =  await generalAccessToken({
          id: payload?.id,
          username: payload?.username,
          password: payload?.password,
          role: payload?.role,
        });
        console.log(' HERE', newAccessToken);
        resolve({
          status: "OK",
          message: "SUCESS",
          newAccessToken
        });
      });
      
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  generalAccessToken,
  generalRefreshToken,
  refreshTokenJwt,
};
