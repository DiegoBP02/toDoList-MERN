import React, { useState, useReducer, useContext, useEffect } from "react";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_TASK_BEGIN,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  GET_TASKS_BEGIN,
  GET_TASKS_SUCCESS,
  SET_EDIT_TASK,
  DELETE_TASK_BEGIN,
  EDIT_TASK_BEGIN,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
} from "./actions";
import reducer from "./reducer";
import axios from "axios";

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  // user
  user: null,
  // task
  isEditing: false,
  editTaskId: "",
  task: "",
  taskUrgencyOptions: ["high", "medium", "low"],
  taskUrgency: "low",
  // tasks
  tasks: [],
  totalTasks: 0,
  numOfPages: 1,
  page: 1,
  // get current user
  userLoading: true,
};
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await authFetch.post(`/auth/${endPoint}`, currentUser);
      const { user } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          alertText,
        },
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logoutUser = async () => {
    await authFetch.get("/auth/logout");
    dispatch({ type: LOGOUT_USER });
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createTask = async () => {
    dispatch({ type: CREATE_TASK_BEGIN });
    try {
      const { task, taskUrgency } = state;

      await authFetch.post("/task", {
        task,
        urgency: taskUrgency,
      });
      dispatch({ type: CREATE_TASK_SUCCESS });
    } catch (error) {
      if (error.response === 401) return;
      dispatch({
        type: CREATE_TASK_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getTasks = async () => {
    dispatch({ type: GET_TASKS_BEGIN });
    try {
      let url = `/task`;

      const { data } = await authFetch(url);
      const { tasks, totalTasks, numOfPages } = data;
      console.log(data);
      dispatch({
        type: GET_TASKS_SUCCESS,
        payload: {
          tasks,
          totalTasks,
          numOfPages,
        },
      });
      console.log("get tasks success");
    } catch (error) {
      console.log(error.response);
      logoutUser();
    }
    clearAlert();
  };

  const setEditTask = (id) => {
    dispatch({ type: SET_EDIT_TASK, payload: { id } });
  };

  const editTask = async () => {
    dispatch({ type: EDIT_TASK_BEGIN });
    try {
      const { task, taskUrgency } = state;
      await authFetch.patch(`/task/${state.editTaskId}`, {
        task,
        urgency: taskUrgency,
      });
      dispatch({ type: EDIT_TASK_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
      getTasks();
    } catch (error) {
      if (error.response === 401) return;
      dispatch({
        type: EDIT_TASK_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteTask = async (taskId) => {
    dispatch({ type: DELETE_TASK_BEGIN });
    try {
      await authFetch.delete(`task/${taskId}`);
      getTasks();
    } catch (error) {
      logoutUser();
    }
  };

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch("/auth/getCurrentUser");
      const { user } = data;

      dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: { user } });
      console.log("get  current user");
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        setupUser,
        logoutUser,
        handleChange,
        clearValues,
        createTask,
        getTasks,
        setEditTask,
        editTask,
        deleteTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
