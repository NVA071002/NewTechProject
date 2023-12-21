import {
  GET_USER_INFO_BY_ID, UPDATE_USER_INFO, STUDENT_REGISTER_THESIS, STUDENT_GET_ALL_THESIS
} from "../action"

// ** Initial State
const initialState = {
  users: [],
  userInfo: null,
  thesisList: []
}

const student = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO_BY_ID:
      return {
        ...state,
        userInfo: action.userInfo
      }
    case UPDATE_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo
      }
    case STUDENT_REGISTER_THESIS:
      return {
        ...state,
        userInfo: action.userInfo
      }
    case STUDENT_GET_ALL_THESIS:
      return {
        ...state,
        thesisList: action.thesisList
      }
    default:
      return { ...state }
  }
}
export default student
