const express = require("express");
const path = require("path");
const app = express();

app.use(express.static('public'))

const PORT = 8080;
const API_KEY = "db869835c76d48cd9fe154022263001";

// Serve static files (this makes index.html accessible)

app.get('/',(req,res) => {
    res.render("index.html")
 })

// Root route - serves index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "indx.html"));
});

// Weather API endpoint - called by frontend
app.get("/weather", async (req, res) => {
    try {
        const city = req.query.city || "Nigeria";
        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on PORT:${PORT}`);
});