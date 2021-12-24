const useTourMiddleware = () => {
  const checkBodyRequest = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
      return res.status(400).json({
        status: "FAIL",
        message: "The name or price property is not present",
      });
    }

    next();
  };

  return {
    checkBodyRequest,
  };
};

module.exports = useTourMiddleware;
