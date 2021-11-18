import Cookies from "js-cookie";
import ActionTypes from "./actionTypes";
import { AppDispatch } from "../../store";
// Services
import { login } from "../../../services";
import { LoginDataType } from "../../../services/datatypes";
// Utils
import { encoded } from "../../../utils";

export const doLogin = (data: LoginDataType) => {
    return async (dispatch: AppDispatch) => {
        dispatch({ type: ActionTypes.LOGIN_REQUEST });

        try {
            const response: any = await login(data);

            const token = encoded(response.data.token);
            Cookies.set("_xSe", token, { expires: 1 });

            return dispatch ({
                type: ActionTypes.LOGIN_SUCCESS,
                payload: {
                    data: response.data.user,
                },
            });
        } catch (err: any) {
            return dispatch ({
                type: ActionTypes.LOGIN_FAILURE,
                payload: {
                    data: false,
                    message: err.message,
                },
            })
        }
    }
}