import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import errorReducer from "./error.reducer";
import salonReducer from "./salon.reducer";
import salonsReducer from "./salons.reducer";

const reducers = combineReducers({
    userReducer,
    usersReducer,
    errorReducer,
    salonReducer,
    salonsReducer,
})

export default reducers