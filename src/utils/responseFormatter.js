exports.success = (
  res,
  { status = 200, statusMessage = "success", message = null, data = null }
) => {
  const payload = { status: statusMessage };
  if (message != null) payload.message = message;
  if (data != null) payload.data = data;
  return res.status(status).json(payload);
};

exports.error = (
  res,
  { status = 500, statusMessage = "fail", message = null, data = null }
) => {
  const payload = { status: statusMessage };
  if (message != null) payload.message = message;
  if (data != null) payload.data = data;
  return res.status(status).json(payload);
};
