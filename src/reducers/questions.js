import {
  GET_QUESTIONS,
  ERROR_REQUEST,
} from '../actions/index';

const INITIAL_STATE = {
  response_code: 0,
  results: [],
};

function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return ({
      ...state,
      results: action.questions.results,
      response_code: action.questions.response_code,
    });
  case ERROR_REQUEST:
    return ({
      ...state,
      response_code: action.error.response_code,
    });
  default:
    return state;
  }
}

export default login;
