import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import makeDb from "./src/data-access/make-db";
import makeLogger from "./src/config/logs";
import router from "./src/routes";

const app = express();
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Origin,Accept,Authorization,X-Requested-With",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(makeLogger());

// Initialize database
makeDb();

// Listen for requests after database was initialized
// Fixed port to 5000 due to conflict in Google Cloud Functions
app.listen(5000, () => {
  console.log("Listening on port 5000");
});

// Initialize routes
app.use("/api", router);
app.get("/", function (req, res) {
  res.send("App is running");
});

// Export app to be used in Test & Cloud Functions
export default app;
