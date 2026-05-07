function successResponse(req, data, statusCode = 200) {
  return {
    statusCode,
    body: {
      success: true,
      data,
      meta: {
        service: process.env.SERVICE_NAME,
        request_id: req.requestId
      }
    }
  };
}

function errorResponse(req, code, message, details = {}, statusCode = 400) {
  return {
    statusCode,
    body: {
      success: false,
      error: {
        code,
        message,
        details
      },
      meta: {
        service: process.env.SERVICE_NAME,
        request_id: req.requestId
      }
    }
  };
}

module.exports = {
  successResponse,
  errorResponse
};