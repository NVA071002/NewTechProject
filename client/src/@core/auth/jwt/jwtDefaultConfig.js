// ** Auth Endpoints
export default {
  loginEndpoint: "/api/login",
  // forgotPasswordEndpoint: "/auth/user/forgot-password",
  // resetPasswordEndpoint: "/auth/user/reset-password",
  // changePasswordEndpoint: "/user/change-password",
  registerEndpoint: "/api/register",

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  mongoTokenUser: "mongoTokenUser",
  storageTokenKeyName: "token",
  storageRefreshTokenKeyName: "refreshTokenUser",
  storageUserData: "userData",
  storageUserDataReLogin: "storageUserDataReLogin",
  storageUserRemember: "userRememberUser",
  rememberUser: "rememberUser",
}
