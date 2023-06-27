import axios from "axios";
import {
  USER_DATA_REQUEST_SUCCESS,
  USER_LOGIN_REQUEST_SUCCESS,
  USER_REQUEST_FAILURE,
  USER_REQUEST_PENDING,
  USER_SINGLE_TASK_DATA,
} from "./actionTypes";
import { BiZoomIn } from "react-icons/bi";
import { useSelector } from "react-redux";

export const url = `http://localhost:8080`; //backened url change it according to the backend server

//The `fetchAllStocks` function is responsible for fetching all stocks from the API. It accepts two parameters: `page` and `limit`, which define the pagination settings for the request.
//const {userDetails } = useSelector((store) => store.reducer);

export const fetchAllBoards = (token, email) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

  // Make a GET request to the API endpoint
  // using live server of coingenko to fetch
  return axios
    .get(`${url}/task`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        email: email,
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({ type: USER_DATA_REQUEST_SUCCESS, payload: res.data }); // Return the response data
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: USER_REQUEST_FAILURE, payload: err });
    }); // Handle any errors
};

export const fetchSingleBoardsData = (token, boardId, email) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

  // Make a GET request to the API endpoint
  // using live server of coingenko to fetch
  return axios
    .get(`${url}/task/board/${boardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        email: email,
      },
    })
    .then((res) => {
      dispatch({ type: USER_SINGLE_TASK_DATA, payload: res.data });
      //  return res.data.board
      // Return the response data
    })
    .catch((err) => dispatch({ type: USER_REQUEST_FAILURE, payload: err })); // Handle any errors
};

//The `registerUserRequest` function is responsible for registering a new user. It takes the user data as input and makes a POST request to the register endpoint of the API.

// Register a new user
export const registerUserRequest = (data) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

  // Make a POST request to the register endpoint
  return axios
    .post(`${url}/user/signup`, data)
    .then((res) => {
      dispatch({ type: "LOADING_FALSE" });
      return res;
    }) // Return the response data
    .catch((err) => dispatch({ type: USER_REQUEST_FAILURE, payload: err })); // Handle any errors
};

// Login user
export const loginUserRequest = (data) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

  // Make a POST request to the login endpoint
  return axios
    .post(`${url}/user/signin`, data)
    .then((res) => {
      // console.log(res.data)
      dispatch({ type: USER_LOGIN_REQUEST_SUCCESS, payload: res.data }); // Dispatch a user login request success action

      return res; // Return the response data
    })
    .catch((err) => {
      // dispatch({ type: USER_REQUEST_FAILURE, payload: err }); // Dispatch a user request failure action
      return err; // Handle any errors
    });
};

// Add bookmarked data for user
export const addBoardData = (data, token) => async (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING });

  try {
    const { email } = data;

    await axios.post(`${url}/task/addboard`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        email: email,
      },
    });

    await dispatch(fetchAllBoards(token, email));

    dispatch({ type: "LOADING_FALSE" });
  } catch (error) {
    dispatch({ type: USER_REQUEST_FAILURE, payload: error });
  }
};
export const deleteBoardData = (id, token, email) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action
  //console.log(email,'..delete')
  // Make a POST request to the add bookmark endpoint
  axios
    .delete(`${url}/task/delete/board/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        email: email,
      },
    })
    .then((res) => dispatch(fetchAllBoards(token, email)))
    .catch((err) => dispatch({ type: USER_REQUEST_FAILURE, payload: err }));
};

export const updateBoardData = (boardId, newData, token, email) => async (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING });

  try {
    await axios.put(`${url}/task/update/board/${boardId}`, newData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        email: email,
      },
    });

    await dispatch(fetchSingleBoardsData(token, boardId, email));

    dispatch({ type: "LOADING_FALSE" });
  } catch (error) {
    dispatch({ type: USER_REQUEST_FAILURE, payload: error });
  }
};

export const deleteTaskFromBoard =
  (id, token, boardId, email) => (dispatch) => {
    dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

    // Make a POST request to the add bookmark endpoint
    axios
      .delete(`${url}/task/delete/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          email: email,
        },
      })
      .then((res) => dispatch(fetchSingleBoardsData(token, boardId)))
      .catch((err) => dispatch({ type: USER_REQUEST_FAILURE, payload: err }));
  };

export const AddSubtaskToTask = (obj) => (dispatch) => {
  const { token, boardId, email } = obj;
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

  // Make a GET request to the API endpoint
  // using live server of coingenko to fetch
  return axios
    .post(`${url}/task/addsubtask`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        email: email,
      },
    })
    .then((res) => {
      dispatch(fetchSingleBoardsData(token, boardId));
      // Return the response data
    })
    .catch((err) => {
      dispatch({ type: USER_REQUEST_FAILURE, payload: err });
      return err;
    }); // Handle any errors
};

export const AddtaskToBoard = (obj) => (dispatch) => {
  const { token, boardId, email } = obj;
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

  // Make a GET request to the API endpoint
  // using live server of coingenko to fetch
  return axios
    .post(`${url}/task/addtask`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        email: email,
      },
    })
    .then((res) => {
      dispatch(fetchSingleBoardsData(token, boardId));
      // Return the response data
    })
    .catch((err) => {
      //console.log(err)
      dispatch({ type: USER_REQUEST_FAILURE, payload: err });
      return err;
    }); // Handle any errors
};

export const updateTaskToDoing = (obj) => (dispatch) => {
  const { token, boardId, taskId, email } = obj;
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

  // Make a GET request to the API endpoint
  // using live server of coingenko to fetch
  return axios
    .patch(`${url}/task/updatetasktodoing/${taskId}`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        email: email,
      },
    })
    .then((res) => {
      dispatch(fetchSingleBoardsData(token, boardId));
      // Return the response data
    })
    .catch((err) => {
      dispatch({ type: USER_REQUEST_FAILURE, payload: err });
      return err;
    }); // Handle any errors
};

export const updateSubTaskStatus = (obj) => (dispatch) => {
  const { token, boardId, taskId, email, subtaskId } = obj;
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

  // Make a GET request to the API endpoint
  // using live server of coingenko to fetch
  return axios
    .patch(`${url}/task/update_subtask_completed/${subtaskId}`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        email: email,
      },
    })
    .then((res) => {
      dispatch(fetchSingleBoardsData(token, boardId));
      // Return the response data
    })
    .catch((err) => {
      dispatch({ type: USER_REQUEST_FAILURE, payload: err });
      return err;
    }); // Handle any errors
};

export const searchTaskInfo = (query, boards) => (dispatch) => {
  const searchResults = [];

  boards.forEach((board) => {
    const matchingTasks = board.tasks.filter((task) => {
      // Check if the task title matches the query
      if (task.title.toLowerCase().includes(query.toLowerCase())) {
        return true;
      }

      // Check if any of the subtask titles match the query
      const matchingSubtasks = task.subtasks.filter((subtask) => {
        return subtask.title.toLowerCase().includes(query.toLowerCase());
      });

      if (matchingSubtasks.length > 0) {
        return true;
      }

      return false;
    });

    if (matchingTasks.length > 0) {
      searchResults.push({
        board: board.name,
        tasks: matchingTasks.map((task) => task.title),
      });
    }
  });

  //console.log(searchResults)
  return searchResults;
};
