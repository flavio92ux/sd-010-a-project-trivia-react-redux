import {
  GET_TOKEN,
  GET_INFO,
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
  case GET_INFO:
    return ({
      ...state,
      name: action.name,
      email: action.email,
    });
  default:
    return state;
  }
}

export default login;
