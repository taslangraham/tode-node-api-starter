export const parseJson = (body: string | JSON) => {
  let result: object;

  try {
    result = typeof (body) === 'string' ? JSON.parse(body) : body;
  } catch (error) {
    result = JSON.parse('{}');
  }

  return result;
};
