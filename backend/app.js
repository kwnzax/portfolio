const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/admin');
//const path = require('path');
const projetsRoutes = require('./routes/Projets');
const toolsRoutes = require('./routes/tools');
const langagesRoutes = require('./routes/langages');

/*mongoose.connect(`mongodb+srv://${process.env.dataUser}:${process.env.dataPwd}@portfolioCluster.trvfbmx.mongodb.net/?retryWrites=true&w=majority&appName=portfolioCluster`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));*/

app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use('/api/auth', userRoutes);
//app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/projets', projetsRoutes);
app.use('/api/tools', toolsRoutes);
app.use('/api/langages', langagesRoutes);


module.exports = app;