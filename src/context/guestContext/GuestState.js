import React, { useReducer } from "react";
import GuestContext from "./GuestContext";
import GuestReducer from "./GuestReducer";
import axios from "axios";
import {
  TOGGLE_FILTER,
  SEARCH_GUEST,
  CLEAR_SEARCH,
  ADD_GUEST,
  REMOVE_GUEST,
  UPDATE_GUEST,
  EDIT_GUEST,
  CLEAR_EDIT,
  GET_GUEST,
  GUESTS_ERROR,
} from "../Types";

const GuestState = (props) => {
  const initialState = {
    filterGuest: false,
    editAble: null,
    search: null,
    guests: [],
    errors: null,
  };

  const [state, dispatch] = useReducer(GuestReducer, initialState);

  //get Guest
  const getGuest = async () => {
    try {
      const res = await axios.get("http://localhost:5000/guests");
      dispatch({
        type: GET_GUEST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GUESTS_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //add guest
  const addGuest = async (guest) => {
    const config = {
      "Content-Type": "application/json",
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/guests",
        guest,
        config
      );
      dispatch({
        type: ADD_GUEST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GUESTS_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //delete guest
  const removeGuest = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/guests/${id}`);
      dispatch({
        type: REMOVE_GUEST,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: GUESTS_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //update guest
  const updateGuest = async (guest) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `http://localhost:5000/guests/${guest._id}`,
        guest,
        config
      );
      dispatch({
        type: UPDATE_GUEST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GUESTS_ERROR,
        payload: err.response.msg,
      });
    }
  };

  const editGuest = (guest) => {
    dispatch({
      type: EDIT_GUEST,
      payload: guest,
    });
  };

  const clearEdit = () => {
    dispatch({
      type: CLEAR_EDIT,
    });
  };

  const toggleFilter = () => {
    dispatch({
      type: TOGGLE_FILTER,
    });
  };

  const searchGuest = (guest) => {
    dispatch({
      type: SEARCH_GUEST,
      payload: guest,
    });
  };

  const clearSearch = () => {
    dispatch({
      type: CLEAR_SEARCH,
    });
  };
  return (
    <GuestContext.Provider
      value={{
        guests: state.guests,
        filterGuest: state.filterGuest,
        toggleFilter,
        searchGuest,
        clearSearch,
        removeGuest,
        updateGuest,
        editGuest,
        clearEdit,
        addGuest,
        getGuest,
        editAble: state.editAble,
        search: state.search,
      }}
    >
      {props.children}
    </GuestContext.Provider>
  );
};

export default GuestState;
