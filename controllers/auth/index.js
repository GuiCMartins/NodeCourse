const { UserModel } = require("../../models");
const { useErrorHandler, AppError } = require("../../errors");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const useAuthController = () => {
  const errorHandler = useErrorHandler();

  const signUp = errorHandler.asyncCatch(async (req, res, next) => {
    const { name, email, photo, password, passwordConfirm } = req.body;

    const newUser = await UserModel.create({
      name,
      email,
      photo,
      password,
      passwordConfirm,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "SUCCESS",
      token,
      data: {
        user: newUser,
      },
    });
  });

  const login = errorHandler.asyncCatch(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please provaid email and password", 400));
    }

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    const token = signToken(user._id);

    res.status(200).json({
      status: "SUCCESS",
      token,
    });
  });

  const protect = errorHandler.asyncCatch(async (req, res, next) => {
   
    const { authorization } = req.headers;
    let token = '';

    if(authorization && authorization.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
    }

    if(!token){
      return next(new AppError("You are not logged in!!", 401));
    }

    next();
  });

  return {
    signUp,
    login,
    protect
  };
};

module.exports = useAuthController;
