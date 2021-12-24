const app = require('./app')

app.listen(process.env.PORT, () => {
  console.log(`Listen to port: ${process.env.PORT} ....`);
});
