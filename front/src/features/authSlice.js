import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  "thunkAuth/register",
  async (formData, { dispatch }) => {
    dispatch(setLoading());
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      console.log(formData);
      dispatch(registerUser(res.data));
    } catch (error) {
      dispatch(registerFail());
      console.log(error);
      const { errors, msg } = error.response.data;
      if (Array.isArray(errors)) {
        errors.forEach((err) => console.log(err.msg)); // remplacer clg par "alert" si je vois que ça apparait niveau UI
      }
      if (msg) {
        console.log(msg);
      }
    }
  }
);

export const login = createAsyncThunk(
  "thunkAuth/login",
  async (formData, { dispatch }) => {
    dispatch(setLoading());
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      dispatch(loginUser(res.data));
    } catch (error) {
      dispatch(loginFail());
      console.log(error);
      const { errors, msg } = error.response.data;
      if (Array.isArray(errors)) {
        errors.forEach((err) => console.log(err.msg));
      }
      if (msg) {
        console.log(msg);
      }
    }
  }
);

export const getAuthUser = createAsyncThunk(
  "thunkAuth/getAuthUser",
  async (x, { dispatch }) => {
    //Dummy "x" variable.
    dispatch(setLoading());
    try {
      const options = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const res = await axios.get(
        "http://localhost:5000/api/auth/current",
        options
      );
      dispatch(authUser(res.data));
    } catch (error) {
      dispatch(authError());
      console.log(error);
      const { errors, msg } = error.response.data;
      if (Array.isArray(errors)) {
        errors.forEach((err) => console.log(err.msg));
      }
      if (msg) {
        console.log(msg);
      }
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    user: null,
    isAuth: false,
    isLoading: true,
    msg: null,
  },
  reducers: {
    registerUser: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      return { ...state, isLoading: false, isAuth: true, ...action.payload };
    },
    setLoading: (state) => {
      return { ...state, isLoading: true };
    },
    loginUser: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      return { ...state, isLoading: false, isAuth: true, ...action.payload };
    },
    authUser: (state, action) => {
      return { ...state, isLoading: false, isAuth: true, ...action.payload };
    },
    logout: (state) => {
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuth: false,
        isLoading: false,
      };
    },
    authError: (state) => {
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuth: false,
        isLoading: false,
      };
    },
    loginFail: (state) => {
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuth: false,
        isLoading: false,
      };
    },
    registerFail: (state) => {
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuth: false,
        isLoading: false,
      };
    },
    noCurrentUser: (state) => {
      return {
        ...state,
        user: null,
        token: null,
        isAuth: false,
        isLoading: false,
      };
    },
  },
});

export const {
  registerUser,
  setLoading,
  loginUser,
  logout,
  authUser,
  authError,
  registerFail,
  loginFail,
  noCurrentUser,
} = authSlice.actions;

export const set_Loading = () => (dispatch) => {
  dispatch(setLoading());
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};

export const selectAuth = (state) => state.auth.value;

export default authSlice.reducer;
