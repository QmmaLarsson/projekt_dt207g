const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Anslut till MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Ansluten till MongoDB");
}).catch((error) => {
    console.error("Error vid anslutning till MongoDB: " + error)
});

//Menu-model
const Menu = require("../models/menu");

//Hämta maträtter från skyddad route
router.get("/menu", async (req, res) => {
    try {
        // Hämta jobbdata från databasen
        const menu = await Menu.find({});

        // Skicka jobbdata tillbaka till klienten
        res.json(menu);
    } catch (error) {
        // Hantera eventuella fel
        console.error("Det uppstod ett fel vid hämtning av menyn:", error);
        res.status(500).json({ message: "Det uppstod ett fel vid hämtning av menyn." });
    }
});

//Posta en maträtt till skyddad route
router.post("/menu", async (req, res) => {
    try {
        const { name, type, description, price} = req.body;

        //Validera input
        if (!name || !type || !description || !price) {
            return res.status(400).json({ error: "Ogiltig inmatning, vänligen fyll i alla fält" });
        }

        //Korrekt input - Skapa ny maträtt
        const newItem = new Menu({ name, type, description, price, });
        await newItem.save();
        res.status(201).json({ message: "Nytt item tillagt på menyn" });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;