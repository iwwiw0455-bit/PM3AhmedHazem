function log(level, message, req = null, extra = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    service: process.env.SERVICE_NAME,
    request_id: req?.requestId || null,
    level,
    message,
    ...extra
  };

  console.log(JSON.stringify(entry));
}

module.exports = {
  info: (message, req, extra) => log("INFO", message, req, extra),
  warn: (message, req, extra) => log("WARN", message, req, extra),
  error: (message, req, extra) => log("ERROR", message, req, extra)
};