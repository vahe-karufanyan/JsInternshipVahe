export default function sendError(res, code, error) {
  return res.status(code).json({ error });
}