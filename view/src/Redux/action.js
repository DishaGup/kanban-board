import axios from "axios";
import {
 
  USER_DATA_REQUEST_SUCCESS,
  USER_LOGIN_REQUEST_SUCCESS,
  USER_REQUEST_FAILURE,
  USER_REQUEST_PENDING,
  USER_SINGLE_TASK_DATA,
} from "./actionTypes";
import { BiZoomIn } from "react-icons/bi";

export const url = `http://localhost:8080`; //backened url change it according to the backend server

//The `fetchAllStocks` function is responsible for fetching all stocks from the API. It accepts two parameters: `page` and `limit`, which define the pagination settings for the request.

export const fetchAllBoards =(token)=> (dispatch) => {
    dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

    // Make a GET request to the API endpoint
    // using live server of coingenko to fetch
    return axios
      .get(
        `${url}/task`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {

        dispatch({type:USER_DATA_REQUEST_SUCCESS,payload:res.data}) // Return the response data
      })
      .catch((err) => err); // Handle any errors
  };

  export const fetchSingleBoardsData =(token,boardId)=> (dispatch) => {
    dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

    // Make a GET request to the API endpoint
    // using live server of coingenko to fetch
    return axios
      .get(
        `${url}/task/board/${boardId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch({type:USER_SINGLE_TASK_DATA,payload:res.data}) 
     //  return res.data.board
      // Return the response data
      })
      .catch((err) => err); // Handle any errors
  };




//The `registerUserRequest` function is responsible for registering a new user. It takes the user data as input and makes a POST request to the register endpoint of the API.

// Register a new user
export const registerUserRequest = (data) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

  // Make a POST request to the register endpoint
  return axios
    .post(`${url}/user/signup`, data)
    .then((res) =>   dispatch({type:"LOADING_FALSE"}) ) // Return the response data
    .catch((err) => err); // Handle any errors
};

// Login user
export const loginUserRequest = (data) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

  // Make a POST request to the login endpoint
  return axios
    .post(`${url}/user/signin`, data)
    .then((res) => {
      dispatch({ type: USER_LOGIN_REQUEST_SUCCESS, payload: res.data }); // Dispatch a user login request success action
      return res; // Return the response data
    })
    .catch((err) => {
      dispatch({ type: USER_REQUEST_FAILURE, payload: err }); // Dispatch a user request failure action
      return err; // Handle any errors
    });
};

// Add bookmarked data for user
export const addBoardData = (data, token) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

  // Make a POST request to the add bookmark endpoint
  return axios
    .post(`${url}/task/addboard`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) =>fetchAllBoards(token))
    .catch((err) => dispatch({ type: USER_REQUEST_FAILURE, payload: err }));
};

// Fetch bookmarked data for user
// export const userBookMarkedDataFetch = (token) => (dispatch) => {
//   dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

//   // Make a GET request to fetch bookmarked data
//   axios
//     .get(`${url}/data/user`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((res) =>
//       dispatch({ type: USER_DATA_REQUEST_SUCCESS, payload: res.data })
//     )
//     .catch((err) => dispatch({ type: USER_REQUEST_FAILURE, payload: err }));
// };

// Remove bookmark for user
// export const userRemoveFromBookMark = (id, token) => (dispatch) => {
//   dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

//   // Make a DELETE request to remove bookmark
//   axios
//     .delete(`${url}/data/user/delete/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((res) => dispatch(userBookMarkedDataFetch(token)))
//     .catch((err) => dispatch({ type: USER_REQUEST_FAILURE, payload: err }));
// };

export const delteBoardData = (id, token) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

  // Make a POST request to the add bookmark endpoint
   axios
    .delete(`${url}/task/delete/board/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) =>fetchAllBoards(token))
    .catch((err) => dispatch({ type: USER_REQUEST_FAILURE, payload: err }));
};

export const deleteTaskFromBoard = (id, token,boardId) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

  // Make a POST request to the add bookmark endpoint
   axios
    .delete(`${url}/task/delete/task/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) =>   dispatch(fetchSingleBoardsData(token,boardId)))
    .catch((err) => dispatch({ type: USER_REQUEST_FAILURE, payload: err }))
};


export const AddSubtaskToTask =(obj)=> (dispatch) => {

  const {token,boardId}=obj
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

  // Make a GET request to the API endpoint
  // using live server of coingenko to fetch
  return axios
    .post(
      `${url}/task/addsubtask`,obj,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
   
      dispatch(fetchSingleBoardsData(token,boardId))
    // Return the response data
    })
    .catch((err) => {
     // console.log(err)
     return err}); // Handle any errors
};

export const AddtaskToBoard =(obj)=> (dispatch) => {
 
    const {token,boardId}=obj
    dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action
  
    // Make a GET request to the API endpoint
    // using live server of coingenko to fetch
    return axios
      .post(
        `${url}/task/addtask`,obj,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
     
    dispatch(fetchSingleBoardsData(token,boardId))
      // Return the response data
      })
      .catch((err) => {
         return err}); // Handle any errors
  };

  
export const updateTaskToDoing =(obj)=> (dispatch) => {
 
  const {token,boardId,taskId}=obj
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

  // Make a GET request to the API endpoint
  // using live server of coingenko to fetch
  return axios
    .patch(
      `${url}/task/updatetasktodoing/${taskId}`,obj,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
   
  dispatch(fetchSingleBoardsData(token,boardId))
    // Return the response data
    })
    .catch((err) => {
      console.log(err)
       return err}); // Handle any errors
};