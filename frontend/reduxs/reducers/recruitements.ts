import ActionTypes from "../actions/recruitements/actionTypes";
import { PositionDataType } from "../../services/datatypes"

interface PositionReducer {
  positions: Array<PositionDataType>;
  position: PositionDataType;
}

interface GetMoviesAction {
  type: ActionTypes.GET_POSITIONS_SUCCESS;
  payload: {
    data: PositionReducer["positions"];
  };
}

interface GetMovieAction {
  type: ActionTypes.GET_POSITION_SUCCESS;
  payload: {
    data: PositionReducer["position"];
  };
}

interface ClearState {
  type: "CLEAR_POSITIONS";
  payload: PositionReducer;
}

type MovieAction = ClearState | GetMoviesAction | GetMovieAction;

const initialState: PositionReducer = {
  positions: [],
  position: {},
};

const positionReducers = (state = initialState, action: MovieAction) => {
  switch (action.type) {
    case ActionTypes.GET_POSITIONS_SUCCESS:
      return {
        ...state,
        positions: [...state.positions, ...action.payload.data],
      };
    case ActionTypes.GET_POSITION_SUCCESS:
      return {
        ...state,
        position: action.payload.data,
      };
    case "CLEAR_POSITIONS":
      return {
        ...state,
        positions: [],
        position: {},
      }
    default:
      return state;
  }
};

export default positionReducers;
