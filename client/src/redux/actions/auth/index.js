// ** UseJWT import to get config
import UseJwt from "../../../@core/auth/jwt/useJwt"
import instances from "../../../@core/plugin/axios"
const config = UseJwt.jwtConfig

export const LOGOUT = 'LOGOUT'
export const LOGIN = 'LOGIN'


export const handleLogin = (data) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN,
      data,
    })
    // ** Add to user, accessToken & refreshToken to localStorage
    localStorage.setItem(config.storageTokenKeyName, data.token)
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT
    })

    // ** Remove user, accessToken & refreshToken from localStorage
    localStorage.removeItem("userData")
    localStorage.removeItem("token")
  }
}

export const logout = (id, setLoading, handleSuccess) => {
  return (dispatch) => {
    setLoading(true)
    instances
      .post("/api/logout", { id: id })
      .then(() => {
        setLoading(false)
        handleSuccess()
        dispatch(handleLogout())
      })
      .catch(() => {
        setLoading(false)
      })
  }
}
