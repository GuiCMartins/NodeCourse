const useUserController = () => {
  const getAllUsers = (req, res) => {
    res.status(200).json({
      status: "SUCCESS",
    });
  };

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