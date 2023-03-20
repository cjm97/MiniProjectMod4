const express = require("express");
const app = express();
const port = 3000;
const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", express.static("public"));


const pageRouter = require("./routes/pageRoutes");



app.use("/list", pageRouter);



app.listen(port, () => {
  console.log(`Listening at port${port}`);
});