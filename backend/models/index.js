const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const obatRoutes = require("./routes/obat_route");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/obat", obatRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Farmasi API");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
