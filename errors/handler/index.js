const useErrorHandler = () => {
  const genericErrorHandler = (err, req, res, next) => {
    console.log(err.stack);

    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  };

  const asyncCatch = (fn) => {
    return (req, res, next) => {
      fn(req, res, next).catch(err => {
        console.log("Erro: ", err);
        next(err);
      });
    };
  };

  return {
    genericErrorHandler,
    asyncCatch,
  };
};

module.exports = useErrorHandler;
