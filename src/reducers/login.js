import {
  GET_TOKEN,
} from '../actions/index';

const INITIAL_STATE = {
  token: '',
  name: '',
  email: '',
};

function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_TOKEN:
    return ({
      ...state,
      token: action.token,
    });
  default:
    return state;
  }
}

export default login;
