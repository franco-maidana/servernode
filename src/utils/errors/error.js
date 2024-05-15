const errors = {
  error: { statusCode: 400, message: "Error!" },
  message: (message) => ({ statusCode: 400, message }),
  callbackPass: (message, statusCode) => ({ statusCode, message }),
  invalidId: { statusCode: 400, message: "Invalid ID Format" },
  existsPass: { statusCode: 401, message: "User already exist!" },
  badAuth: { statusCode: 401, message: "Bad Auth!" },
  forbidden: { statusCode: 403, message: "Forbidden!" },
  notFound: { statusCode: 404, message: "Not Found docs!" },
  fatal: { statusCode: 500, message: "Server Error!" },
};

export default errors;
