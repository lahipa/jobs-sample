import ActionTypes from "./actionTypes";
import { getRecruitements, getRecruitement } from "../../../services";
import { PositionDataType, RecruitementParams } from "../../../services/datatypes";
import { AppDispatch } from "../../store";

export const getListPositions = (params?: RecruitementParams) => {
    return async (dispatch: AppDispatch) => {
        dispatch({ type: ActionTypes.GET_POSITIONS_REQUEST });

        try {
            const response: any = await getRecruitements(params);

            return dispatch ({
                type: ActionTypes.GET_POSITIONS_SUCCESS,
                payload: {
                    data: response.data,
                },
            });
        } catch (err: any) {
            return dispatch ({
                type: ActionTypes.GET_POSITIONS_FAILURE,
                payload: {
                    data: false,
                    message: err.message,
                },
            })
        }
    }
}

export const getDetailPosition = (id: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch({ type: ActionTypes.GET_POSITION_REQUEST });

        try {
            const response: any = await getRecruitement(id);

            return dispatch ({
                type: ActionTypes.GET_POSITION_SUCCESS,
                payload: {
                    data: response.data,
                },
            });
        } catch (err: any) {
            return dispatch ({
                type: ActionTypes.GET_POSITION_FAILURE,
                payload: {
                    data: false,
                    message: err.message,
                },
            })
        }
    }
}