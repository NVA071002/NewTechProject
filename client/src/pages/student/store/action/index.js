// import axios from 'axios'
import { configHeader } from "../../../../@core/plugin/configHeader"
import toast from "react-hot-toast"
import axios from "axios"
export const STUDENT_GET_ALL_THESIS = "STUDENT_GET_ALL_THESIS"
export const STUDENT_REGISTER_THESIS = "STUDENT_REGISTER_THESIS"
export const GET_USER_INFO_BY_ID = "GET_USER_INFO_BY_ID"
export const UPDATE_USER_INFO = "UPDATE_USER_INFO"
export const getUserInfoById = (id, handleError) => {
  return async (dispatch) => {
    await axios.post(`/api/personal`, { id: id }, configHeader(JSON.parse(localStorage.getItem("userData")).token)[0])
      .then((response) => {
        dispatch({
          type: GET_USER_INFO_BY_ID,
          userInfo: response?.data?.userData,
        })
        localStorage.setItem("userData", JSON.stringify(response?.data?.userData))
      })
      .catch(e => {
        if (e.response.status === 403) {
          handleError()
        }
        else if (e.response.status === 400 && e.response.data?.message === "token is expired") {
          handleError()
        }
      })

  }
}

export const updateUserInfo = (id, handleError) => {
  return async (dispatch) => {
    console.log(JSON.parse(localStorage.getItem("userData")).token)
    await axios.post(`/api/update-by-id`, { id: id }, configHeader(JSON.parse(localStorage.getItem("userData")).token)[0])
      .then((response) => {
        dispatch({
          type: UPDATE_USER_INFO,
          userInfo: response?.data?.userData,
        })
      })
      .catch(e => {
        if (e.response.status === 403) {
          handleError()
        }
        else if (e.response.status === 400 && e.response.data?.message === "token is expired") {
          handleError()
        }
      })

  }
}
export const registerThesis = (params, handleError, handleSuccess) => {
  return async (dispatch) => {
    await axios.post(`/api/register-thesis`, params, configHeader(JSON.parse(localStorage.getItem("userData")).token)[0])
      .then((response) => {
        dispatch({
          type: STUDENT_REGISTER_THESIS,
          userInfo: response?.data?.userData,
        })
      }).then(() => {
        handleSuccess()
      })
      .catch(e => {
        if (e.response.status === 403) {
          handleError()
        }
        else if (e.response.status === 400 && e.response.data?.message === "token is expired") {
          handleError()
        }
        else toast.error(e.response.data?.message)
      })

  }
}

export const getAllThesis = (params, handleError) => {
  return async (dispatch) => {
    await axios.post(`/api/get-all-thesis`, params, configHeader(JSON.parse(localStorage.getItem("userData")).token)[0]).then((response) => {
      dispatch({
        type: STUDENT_GET_ALL_THESIS,
        thesisList: response?.data?.referenceData?.data,
      })
    })
      .catch(e => {
        if (e.response.status === 403) {
          handleError()
        }
        else if (e.response.status === 400 && e.response.data?.message === "token is expired") {
          handleError()
        }
      })

  }
}