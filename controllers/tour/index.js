const { TourModel } = require("../../models");

const useTourController = () => {
  const getAllTours = async (req, res) => {
    try {
      let queryStr = JSON.stringify(req.query);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );

      const sort = req.query.sort ? req.query.sort : "-createdAt";
      const fields = req.query.fields
        ? req.query.fields.split(".").join(" ")
        : "-__v";
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const skip = (page - 1) * limit;

      if (req.query.page) {
        const numberOfTours = await TourModel.count();
        if (skip >= numberOfTours) {
          throw new Error("This page does not exist!");
        }
      }

      let query = await TourModel.find(JSON.parse(queryStr))
        .sort(sort)
        .select(fields)
        .skip(skip)
        .limit(limit);

      const tours = query;

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
