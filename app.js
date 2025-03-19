const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Set Pug as the template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Route for the homepage
app.get("/", (req, res) => {
    res.render("index", { title: "Home Page", message: "Welcome to My Express App with Pug!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});