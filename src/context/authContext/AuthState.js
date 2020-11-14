import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import {
  SUCCESS_REGISTER,
  SUCCESS_LOGIN,
  FAIL_REGISTER,
  FAIL_LOGIN,
  SET_ERROR,
  CLEAR_ERROR,
  LOG_OUT,
  SET_USER,
  AUTH_ERROR,
} from "../Types";
import setToken from "../../utils/setToken";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    userAuth: null,
    errors: null,
    user: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //getuser
  const getUser = async () => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    try {
      const res = await axios.get("http://localhost:5000/auth");
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data,
      });
    }
  };

  //register user
  const registerUser = async (userData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/register",
        userData,
        config
      );
      dispatch({
        type: SUCCESS_REGISTER,
        payload: res.data,
      });
      getUser();
    } catch (err) {
      dispatch({
        type: FAIL_REGISTER,
        payload: err.response.data,
      });
    }
  };

  //login user
  const loginUser = async (userData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/auth",
        userData,
        config
      );
      dispatch({
        type: SUCCESS_LOGIN,
        payload: res.data,
      });
      getUser();
    } catch (err) {
      dispatch({
        type: FAIL_LOGIN,
        payload: err.response.data,
      });
    }
  };

  const setError = (err) => {
    dispatch({
      type: SET_ERROR,
      payload: err,
    });
  };

  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };

  const logout = () => {
    dispatch({
      type: LOG_OUT,
    });
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        registerUser,
        loginUser,
        getUser,
        setError,
        clearError,
        logout,
        loading: state.loading,
        userAuth: state.userAuth,
        errors: state.errors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
