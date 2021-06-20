import {
  GET_QUESTIONS,
  ERROR_REQUEST,
  CLICKED,
} from '../actions/index';

const INITIAL_STATE = {
  response_code: 0,
  results: [],
  click: false,
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
  case CLICKED:
    return ({
      ...state,
      click: action.payload,
    });
  default:
    return state;
  }
}

export default login;
