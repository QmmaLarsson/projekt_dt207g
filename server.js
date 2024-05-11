const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/api", authRoutes);
app.use("/api", menuRoutes);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/api", (req, res) => {
    res.json({ message: "Välkommen till detta restaurang-API" })
});

//Starta applikation
app.listen(port, () => {
    console.log(`Severn är startad på http://localhost:${port}`);
});