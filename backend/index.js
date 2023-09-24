const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const app = express();

dotenv.config();
connectDb();

const router = require("./router/routes");
//middlewares
app.use(express.urlencoded({ extended: true }));
//above middleware use as we get data from FE html forms in urlencoded manner
app.use(express.json());
//above middleware converts the data in json fromat

app.use("/", router);

app.listen(8000, () => {
  console.log(`server is listening on port : 8000`);
});
