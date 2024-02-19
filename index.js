// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoutes');
require("dotenv").config({ path: "./.env" });

mongoose.connect(process.env.MONGO_URL);
const app = express();
app.use(express.static(path.join(__dirname, "dist")));
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/contact', contactRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: "resource Not found" });
});

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
});

mongoose.connection.once("open", () => {
    console.log('MONGO CONNECTED');
    app.listen(PORT, () => console.log("SERVER RUNNING"));
});
