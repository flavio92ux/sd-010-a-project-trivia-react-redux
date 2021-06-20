import {
  GET_QUESTIONS,
  ERROR_REQUEST,
  CLICKED,
  TIMER,
} from '../actions/index';

const INITIAL_STATE = {
  response_code: 0,
  results: [],
  click: false,
  time: 30,
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
  case TIMER:
    return ({
      ...state,
      time: action.payload,

    });
  default:
    return state;
  }
}

export default login;
