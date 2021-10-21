import {SET_CHARACTER_DATA} from '../constants/actionTypes';

const initialState = {
  characters: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CHARACTER_DATA:
      return {
        ...state,
        characters: action.payload,
      };
    default:
      return state;
  }
}
