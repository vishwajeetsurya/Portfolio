// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoutes');
require("dotenv").config({ path: "./.env" })
// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
const app = express();
app.use(express.json())
app.use(express.static(path.join(__dirname, "dist")))

// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }))
app.use(cors())
const PORT = process.env.PORT || 5000;


app.use('/api/contact', contactRoutes);

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
    res.status(404).json({ message: "resource Not foudn" })
})
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: "something went wrong" })
})

mongoose.connection.once("open", () => {
    console.log('MONGO CONNECTED');
    app.listen(process.env.PORT, console.log("SERVER RUNNING"))
})