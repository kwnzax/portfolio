require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const userRoutes = require('./routes/admin');
const path = require('path');
const projetsRoutes = require('./routes/projets');
const toolsRoutes = require('./routes/tools');
const skillsRoutes = require('./routes/skills');


mongoose.connect(`mongodb+srv://${process.env.adminData}:${process.env.adminDataPwd}@portfoliocluster.2jycnch.mongodb.net/?retryWrites=true&w=majority&appName=portfolioCluster`,
)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.log('Connexion à MongoDB échouée !', error));

app.use(express.json());

app.use(cors({
    origin: '*', 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));


app.use('/api/login', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/projets', projetsRoutes);
app.use('/api/tools', toolsRoutes);
app.use('/api/skills', skillsRoutes);


module.exports = app;
