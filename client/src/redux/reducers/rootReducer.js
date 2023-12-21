// ** Redux Imports
import { combineReducers } from "redux"
import student from "../../pages/student/store/reducer"
// ** Reducers Imports
import authReducer from "./auth"

const rootReducer = combineReducers({
    authReducer,
    student,

})

export default rootReducer
