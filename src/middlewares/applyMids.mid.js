const applyMidds = (each) => async (req, res, next) => {
  try {
    await each(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default applyMidds;
