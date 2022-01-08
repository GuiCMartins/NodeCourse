const { TourModel } = require("../../models");
const { useErrorHandler } = require('../../errors')
const { useGeneralApiFeatures } = require("../../utils");

const useTourController = () => {
  const generalApiFeatures = useGeneralApiFeatures();
  const errorHandler = useErrorHandler();

  const getAllTours = errorHandler.asyncCatch(async (req, res, next) => {
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
  });

  const getOneTour = errorHandler.asyncCatch(async (req, res, next) => {
    const tour = await TourModel.findById(req.params.id);

    res.status(200).json({
      status: "SUCCESS",
      data: tour,
    });
  });

  const createOneTour = errorHandler.asyncCatch(async (req, res, next) => {
    const tour = await TourModel.create(req.body);

    res.status(201).json({
      status: "SUCCESS",
      data: tour,
    });
  });

  const updateOneTour = errorHandler.asyncCatch(async (req, res, next) => {
    const tour = await TourModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "SUCCESS",
      data: tour,
    });
  });

  const deleteOneTour = errorHandler.asyncCatch(async (req, res, next) => {
    await TourModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "SUCCESS",
      message: "Tour deleted!",
    });
  });

  const getStats = errorHandler.asyncCatch(async (req, res, next) => {
    const stats = await TourModel.aggregate([
      {
        $match: { ratingAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: "$difficulty" },
          numTours: { $sum: 1 },
          numRatings: { $sum: "$ratingQuantity" },
          avgRating: { $avg: "$ratingAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $sort: { avgPrice: -1 },
      },
    ]);

    res.status(200).json({
      status: "SUCCESS",
      data: stats,
    });
  });

  const getMonthlyPlan = errorHandler.asyncCatch(async (req, res, next) => {
    const year = Number(req.params.year);

    const plan = await TourModel.aggregate([
      {
        $unwind: "$startDates",
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group : {
          _id: {$month: '$startDates'},
          numToursStarts: {$sum: 1},
          tours: { $push: '$name' }
        }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: {_id: 0}
      },
      {
        $sort: {numToursStarts: -1}
      },
      {
        $limit: 12
      }
    ]);

    res.status(200).json({
      status: "SUCCESS",
      data: plan,
    });
  });

  return {
    getAllTours,
    getOneTour,
    createOneTour,
    updateOneTour,
    deleteOneTour,
    getStats,
    getMonthlyPlan,
  };
};

module.exports = useTourController;
