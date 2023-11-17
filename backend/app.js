const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require('cors');
const bodyParser = require("body-parser");

const rolesRoutes = require('./routes/rolesRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());
app.use('/api/admin', rolesRoutes);
app.use('/api', userRoutes);
app.use('/api', authRoutes);

const uri = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

mongoose.connect(uri)
.then(() => console.log("connected to database successfully"))
.catch((error) => console.log(error.message));
