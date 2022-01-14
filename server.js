require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successfull!"));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Listen to port: ${PORT} ....`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Shutting down UNHANDLED REJECTION....');
  server.close(() => {
    process.exit(1);
  });
})

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('Shutting down UNCAUGHT EXCEPTION....');
  server.close(() => {
    process.exit(1);
  });
})
