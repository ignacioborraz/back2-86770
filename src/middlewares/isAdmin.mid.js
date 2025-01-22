const isAdmin = (req, res, next) => {
  try {
    const { role, user_id } = req.session;
    if (role !== "ADMIN") {
      const error = new Error("Forbbiden");
      error.statusCode = 403;
      throw error;
    }
    req.body.owner_id = user_id;
    return next();
  } catch (error) {
    next(error);
  }
};

export default isAdmin;
