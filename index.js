import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import v1 from "./routes/index.js";

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/v1", v1);
app.use("/", (req, res) =>
  res
    .status(200)
    .json({ ok: true, msg: "Welcome at API MRBS PT. Duraquipt Cemerlang" })
);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
