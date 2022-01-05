const { TourModel } = require("../../models");
const { useGeneralApiFeatures } = require('../../utils')

const useTourController = () => {

  const generalApiFeatures = useGeneralApiFeatures();

  const getAllTours = async (req, res) => {
    try {
      
      const queryStr = generalApiFeatures.filter(req.query);
      const sort = generalApiFeatures.sort(req.query);
      const limitFields = generalApiFeatures.limitFields(req.query);
      const pagination = generalApiFeatures.pagination(req.query);

      const tours = await TourModel.find(JSON.parse(queryStr))
        .sort(sort)
        .select(limitFields)
        .skip(pagination.skip)
        .limit(pagination.limit);

      res.status(200).json({
        status: "SUCCESS",
        results: tours.length,
        data: tours,
      });
    } catch (err) {
      res.status(500).json({
        status: "FAIL",
        message: err.message,
      });
    }
  };

  const getOneTour = async (req, res) => {
    try {
      const tour = await TourModel.findById(req.params.id);

      res.status(200).json({
        status: "SUCCESS",
        data: tour,
      });
    } catch (err) {
      res.status(500).json({
        status: "FAIL",
        message: err.message,
      });
    }
  };

  const createOneTour = async (req, res) => {
    try {
      const tour = await TourModel.create(req.body);

      res.status(201).json({
        status: "SUCCESS",
        data: tour,
      });
    } catch (err) {
      return res.status(500).json({
        status: "Fail",
        message: err.message,
      });
    }
  };

  const updateOneTour = async (req, res) => {
    try {
      const tour = await TourModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        status: "SUCCESS",
        data: tour,
      });
    } catch (err) {
      return res.status(500).json({
        status: "Fail",
        message: err.message,
      });
    }
  };

  const deleteOneTour = async (req, res) => {
    try {
      await TourModel.findByIdAndDelete(req.params.id);

      res.status(200).json({
        status: "SUCCESS",
        message: "Tour deleted!",
      });
    } catch (err) {
      return res.status(500).json({
        status: "Fail",
        message: err.message,
      });
    }
  };

  return {
    getAllTours,
    getOneTour,
    createOneTour,
    updateOneTour,
    deleteOneTour,
  };
};

module.exports = useTourController;
