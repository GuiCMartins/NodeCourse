const mongoose = require("mongoose");
const slugify = require("slugify");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      unique: true,
      trim: true,
      maxlength: [
        40,
        "A tour name must have less or equals than 40 characters",
      ],
      minlength: [
        10,
        "A tour name must have more or equals than 10 characters",
      ],
    },
    slug: {
      type: String,
    },
    duration: {
      type: Number,
      required: [true, "Duration is required!"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "Group size is required!"],
    },
    difficulty: {
      type: String,
      required: [true, "Difficulty is required!"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty must be easy, medium or difficult",
      },
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Price is required!"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (value) {
          return value < this.price;
        },
        message: "Price ({VALUE}) must be greater than discount",
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "Summary is required!"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "Image is required!"],
    },
    images: [
      {
        type: String,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [
      {
        type: Date,
      },
    ],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

module.exports = mongoose.model("tour", tourSchema);
