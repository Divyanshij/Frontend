const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/database" )
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const db = mongoose.connection;

// Error handling for MongoDB connection
db.on("error", (err) => {
    console.error("Connection error:", err);
});

db.once("open", () => {
    console.log("Connected to MongoDB");
});


// Define a schema and model for users
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    linkedin: String,
    github: String,
    portfolio: String,
    summary: String,
    company: String,
    location: String,
    year_of_joining_company: String,
    year_of_leaving_company: String,
    role: String,
    degree: String,
    institute: String,
    year_of_passing_degree: String,
    percentage: String,
    project: String,
    description: String,
    role_in_project: String,
    duration_of_project: String,
    certification_name: String,
    location_of_certification: String,
    year_of_completion_of_certification: String,
    skill: String,
    language: String
});


const User = mongoose.model("User", userSchema);

// POST request handler
app.post('/submit', async(req, res) => {
    try{
    console.log("Request body:", req.body);
    const userData = new User({
        name: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        linkedin: req.body.linkedin,
        github: req.body.github,
        portfolio: req.body.portfolio,
        summary: req.body.summary,
        company: req.body.company, 
        location: req.body.location,
        year_of_joining_company: req.body.year_of_joining_company,
        year_of_leaving_company: req.body.year_of_leaving_company,
        role: req.body.role,
        degree: req.body.degree,
        institute: req.body.institute,
        year_of_passing_degree: req.body.year_of_passing_degree,
        percentage: req.body.percentage,
        project: req.body.project,
        description: req.body.description,
        role_in_project: req.body.role_in_project,
        duration_of_project: req.body.duration_of_project,
        certification_name: req.body.certification_name,
        location_of_certification: req.body.location_of_certification,
        year_of_completion_of_certification: req.body.year_of_completion_of_certification,
        skill: req.body.skill,
        language: req.body.language
    });

    await userData.save();
    console.log("Record inserted successfully");
    return res.redirect('/forms.html');
    }
catch (err) {
    console.error("Error inserting record:", err);
        return res.status(500).send("There was an error with your request.");
    }
});

// GET request handler
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/forms.html');
});

// Start server once on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});