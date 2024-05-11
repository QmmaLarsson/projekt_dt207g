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

//Hämta items från menyn
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

//Posta item till menyn
router.post("/menu", authenticateToken, async (req, res) => {
    try {
        const { name, type, description, price} = req.body;

        //Validera input
        if (!name || !type || !description || !price) {
            return res.status(400).json({ error: "Ogiltig inmatning, vänligen fyll i alla fält" });
        }

        //Korrekt input - Skapa nytt item på menyn
        const newItem = new Menu({ name, type, description, price, });
        await newItem.save();
        res.status(201).json({ message: "Nytt item tillagt på menyn" });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

//Ta bort item från menyn
router.delete("/menu/:id", authenticateToken, async (req, res) => {
    try {
        const itemId = req.params.id;

        const result = await Menu.findByIdAndDelete(itemId);

        return res.json(result);
    } catch (error) {
        //Errorhantering
        return res.status(500).json({ message: "Det uppstod ett fel vid borttagning av item på menyn", error: error });
    }
});

//Uppdatera item på menyn
router.put("/menu/:id", authenticateToken, async (req, res) => {
    try {
        const itemId = req.params.id;
        const updatedItem = req.body;

        const result = await Menu.findByIdAndUpdate(itemId, updatedItem, { new: true });

        return res.json(result);
    } catch (error) {
        //Errorhantering
        return res.status(500).json({ message: "Det uppstod ett fel vid uppdatering av item på menyn.", error: error });
    }
});

//Validering av token
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) res.status(401).json({ message: "Token saknas - du har ej tillgång till denna route" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if (err) return res.status(403).json({ message: "Felaktigt JWT-token" });
        req.username = username;
        next();
    });
}


module.exports = router;