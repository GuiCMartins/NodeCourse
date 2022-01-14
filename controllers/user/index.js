const { UserModel } = require('../../models')
const { useErrorHandler } = require('../../errors')

const useUserController = () => {

  const errorHandler = useErrorHandler();

  const getAllUsers = errorHandler.asyncCatch(async (req, res) => {

    const users = await UserModel.find();

    res.status(200).json({
      status: "SUCCESS",
      results: users.length,
      data: users,
    });
  });

  const getOneUser = (req, res) => {
    res.status(200).json({
      status: "SUCCESS",
    });
  };

  const createOneUser = (req, res) => {
    res.status(201).json({
      status: "SUCCESS",
    });
  };

  const updateOneUser = (req, res) => {
    res.status(200).json({
      status: "SUCCES",
    });
  };

  const deleteOneUser = (req, res) => {
    res.status(204).json({
      status: "SUCCES",
    });
  };

  return {
      getAllUsers,
      getOneUser,
      createOneUser,
      updateOneUser,
      deleteOneUser
  }

};

module.exports = useUserController