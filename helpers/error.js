function sendError(res, code, error) {
  return res.status(code).json({
    error,
  });
}

export default sendError;