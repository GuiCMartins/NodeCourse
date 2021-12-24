const useCommonMiddleware = () => {
  const checkId = (req, res, next, val) => {
    if (Number(val) > 10) {
      return res.status(404).json({
        status: "Fail",
        message: "Id not found",
      });
    }
    next();
  };

  return {
    checkId,
  };
};

module.exports = useCommonMiddleware;
