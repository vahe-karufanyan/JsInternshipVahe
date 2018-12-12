export default function sendError(res, code, error) {
  // console.log(error);
  return res.status(code).send(error);
}