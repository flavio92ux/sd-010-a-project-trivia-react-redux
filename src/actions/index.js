import getToken, { getQuestions } from '../services/api';

export const GET_TOKEN = 'GET_TOKEN';
export const ERROR = 'ERROR';
export const GET_INFO = 'GET_INFO';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ERROR_REQUEST = 'ERROR_REQUEST';
export const CLICKED = 'CLICKED';
export const TIMER = 'TIMER';
export const STOP_TIME = 'STOP_TIME';
export const SET_SCORE = 'SET_SCORE';

export const getTokenSucess = (token) => ({
  type: GET_TOKEN,
  token,
});

export const getQuestionSucess = (questions) => ({
  type: GET_QUESTIONS,
  questions,
});

export const apiError = () => ({
  type: ERROR,
});

export const errorRequest = (error) => ({
  type: ERROR_REQUEST,
  error,
});

export const getInfo = (name, email) => ({
  type: GET_INFO,
  name,
  email,
});

export const clicked = (payload) => ({
  type: CLICKED,
  payload,
});

export const timer = (payload) => ({
  type: TIMER,
  payload,
});

export const stopTime = (payload) => ({
  type: STOP_TIME,
  payload,
});

export const setScore = (score) => ({
  type: SET_SCORE,
  score,
});

export const getTokenThunk = () => (dispatch) => {
  getToken()
    .then((res) => (dispatch(getTokenSucess(res))))
    .catch(() => { apiError(); });
};

export const getQuestionsThunk = (token) => (dispatch) => {
  getQuestions(token)
    .then((res) => (dispatch(getQuestionSucess(res))))
    .catch((error) => { errorRequest(error); });
};
