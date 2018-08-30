function sendError (res, code, error) {
    return res.status(code).json({
        error: error
    });
}

export default sendError;