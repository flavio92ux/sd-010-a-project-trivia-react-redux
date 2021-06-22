import {
  GET_QUESTIONS,
  ERROR_REQUEST,
  CLICKED,
  TIMER,
  STOP_TIME,
  SET_SCORE,
  STOP_INTERVAL,
} from '../actions/index';

const INITIAL_STATE = {
  response_code: 0,
  results: [],
  click: false,
  time: 30,
  timeStop: false,
  score: 0,
  matches: 0,
  stopInterval: false,
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
  case STOP_TIME:
    return ({
      ...state,
      timeStop: action.payload,
    });
  case SET_SCORE:
    return ({
      ...state,
      score: state.score + action.score,
      matches: state.matches + 1,
    });
  case STOP_INTERVAL:
    return ({
      ...state,
      stopInterval: action.bool,

    });
  default:
    return state;
  }
}

export default login;
