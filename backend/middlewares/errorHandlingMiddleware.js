const notFoundError = (req, res, next) => {
    const error = new Error(`NOT FOUND - ${req.url}`);
    res.status(404);
    next(error);
  };
  

  const handler =(err, req, res, next) => {
    res.status(500).send('Something went wrong!');
};
  export { notFoundError,handler };
  