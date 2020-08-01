import * as types from "../constants/actionTypes";
import _ from "lodash";

const initialState = {
  isLoading: true,
  user: {
    _id: "",
    email: "",
    dayOfBirth: null,
    phoneNumber: "",
    fullName: "",
    avatar: "",
  },
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROFILE_ADMIN:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };

    case types.UPDATE_PROFILE_ADMIN:
      let dataPersonal = { ...state };

      const keyArr = Object.keys(action.payload);

      _.forEach(keyArr, function (value) {
        dataPersonal.user[value] = action.payload[value];
      });
      return dataPersonal;

    case types.UPDATE_AVATAR:
      return {
        ...state,
        ...action.payload,
      };

    case types.GET_AVATAR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default usersReducer;
