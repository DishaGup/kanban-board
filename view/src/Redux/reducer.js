import {
  SEARCH_SINGLE_STOCKS,
  USER_DATA_REQUEST_SUCCESS,
  USER_LOGIN_REQUEST_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_REQUEST_FAILURE,
  USER_REQUEST_PENDING,
  USER_REQUEST_SUCCESS,
  USER_SINGLE_TASK_DATA,
} from "./actionTypes";

const initial = {
  loading: false,
  error: "",
  TaskData: [],
  userDetails: [],
  token: "",
  subTaskData:[],
  SingleTaskData:[]
};

export const reducer = (state = initial, { type, payload }) => {
  switch (type) {
    case USER_REQUEST_PENDING:
      // Set loading to true when a user request is pending
      return {
        ...state,
        loading: true,
      };

    case USER_LOGIN_REQUEST_SUCCESS:
      // Update user details and token on successful user login request
      return {
        ...state,
        loading: false,
        userDetails: payload.userD,
        token: payload.token,
      };

    case USER_DATA_REQUEST_SUCCESS:
      // Update bookmarked data on successful user data request
      return {
        ...state,
        loading: false,
        TaskData: payload.boards,
      };
      case USER_SINGLE_TASK_DATA:
             
        return {
          ...state,
          loading: false,
          SingleTaskData: payload.board.tasks
        };
    case USER_LOGOUT_SUCCESS:
      // Reset user details and token on successful user logout
      return {
        ...state,
        loading: false,
        userDetails: [],
        token: "",
      };

    case USER_REQUEST_FAILURE:
      // Update error message on user request failure
      return {
        ...state,
        loading: false,
        error: payload?.response?.data?.error,
      };
      case "LOADING_FALSE":
        // Update error message on user request failure
        return {
          ...state,
          loading: false,
       
        };

    default:
      return state;
  }
};
