import getToken from '../services/api';

export const GET_TOKEN = 'GET_TOKEN';
export const ERROR = 'ERROR';
export const GET_INFO = 'GET_INFO';

export const getTokenSucess = (token) => ({
  type: GET_TOKEN,
  token,
});

export const apiError = () => ({
  type: ERROR,
});

export const getInfo = (name, email) => ({
  type: GET_INFO,
  name,
  email,
});

export const getTokenThunk = () => (dispatch) => {
  getToken()
    .then((res) => (dispatch(getTokenSucess(res))))
    .catch(() => { apiError(); });
};
