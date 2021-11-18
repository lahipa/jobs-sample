import ActionTypes from "../actions/users/actionTypes";
import { UserDataType } from "../../services/datatypes"

interface UserReducer {
  user: UserDataType;
  isLogin: boolean;
}

interface LoginAction {
  type: ActionTypes.LOGIN_SUCCESS;
  payload: {
    data: UserReducer["user"];
  };
}

interface LogoutAction {
    type: "LOGOUT";
    payload: UserReducer;
  }

type userAction = LoginAction | LogoutAction;

const initialState: UserReducer = {
  user: {},
  isLogin: false,
};

const positionReducers = (state = initialState, action: userAction) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        isLogin: true,
      };
    case "LOGOUT":
      return {
        ...state,
        userr: {},
        isLogin: false,
      };
    default:
      return state;
  }
};

export default positionReducers;
