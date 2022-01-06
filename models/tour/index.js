const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      unique: true,
      trim: true,
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
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

module.exports = mongoose.model("tour", tourSchema);
