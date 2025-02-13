const appyRes = (req, res, next) => {
  const { method, url } = req;
  /* definimos las funciones que que crean las respuestas */
  const successResponse = (statusCode, response, message) => res.status(statusCode).json({ method, url, response, message });
  const errorResponse = (statusCode, error) => res.status(statusCode).json({ method, url, error });
  /* creamos los métodos para responder usando las funciones */
  res.json200 = (response, message = "Success") => successResponse(200, response, message);
  res.json201 = (response, message = "Created") => successResponse(201, response, message);
  res.json400 = (message = "Client Error") => errorResponse(400, message);
  res.json401 = (message = "Bad auth") => errorResponse(401, message);
  res.json403 = (message = "Forbidden") => errorResponse(403, message);
  res.json404 = (message = "Not found") => errorResponse(404, message);
  res.json500 = (message = "Server Error") => errorResponse(500, message);
  /* dejamos pasar */
  next();
};

export default appyRes;
