const useTourController = () => {
  const getAllTours = (req, res) => {
    res.status(200).json({
      status: "SUCCESS",
    });
  };

  const getOneTour = (req, res) => {
    res.status(200).json({
      status: "SUCCESS",
    });
  };

  const createOneTour = (req, res) => {
    res.status(201).json({
      status: "SUCCESS",
    });
  };

  const updateOneTour = (req, res) => {
    res.status(200).json({
      status: "SUCCES",
    });
  };

  const deleteOneTour = (req, res) => {
    res.status(204).json({
      status: "SUCCES",
    });
  };

  return {
      getAllTours,
      getOneTour,
      createOneTour,
      updateOneTour,
      deleteOneTour
  }
};

module.exports = useTourController