const express = require("express");
const path = require("path");
const sass = require("sass");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use("/css", (req, res, next) => {
    const scssFile = path.join(__dirname, "public/scss", "style.scss");
    const cssFile = path.join(__dirname, "public/css", "style.css");

    // Compile SCSS to CSS using Dart Sass
    try {
        const result = sass.renderSync({
            file: scssFile,
            outputStyle: "compressed",  // You can set to 'expanded' if you want unminified CSS
        });

        // Write the compiled CSS to the file
        fs.writeFileSync(cssFile, result.css);

        // Continue to the next middleware or route
        next();
    } catch (error) {
        console.error("Sass Compilation Error:", error);
        res.status(500).send("Error compiling Sass");
    }
});

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Set Pug as the template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Route for the homepage
app.get("/", (req, res) => {
    res.render("index", { title: "Home Page", message: "Welcome to My Express App with Sass!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});