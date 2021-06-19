const getToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const json = await response.json();
  return json.token;
};

export const getQuestions = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const json = await response.json();
  return json;
};

export default getToken;
