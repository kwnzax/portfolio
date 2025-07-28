const Tool = require('../models/Tool');
const fs = require('fs');

exports.createTool = (req, res, next) => {
    const toolObject = { ...req.body, ...req.file};
    delete toolObject._id;
    

    const tool = new Tool({
        ...toolObject,
        logo: `${req.protocol}://${req.get("host")}/images/${req.processedLogo}`,
    });
    tool.save()
        .then(() => res.status(201).json({ message: 'Outil enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllTools = (req, res, next) => {
    Tool.find()
        .then(tools => res.status(200).json(tools))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteTool = (req, res, next) => {
    Tool.findOne({ _id: req.params.id })
        .then(tool => {
            if (!tool) {
                return res.status(404).json({ error: "Outil non trouvé" });
            }
            const logoFilename = tool.logo.split('/images/')[1];
            if (logoFilename) {
                fs.unlink(`images/${logoFilename}`, err => {
                    if (err) console.error("Erreur suppression logo :", err);
                });
            }

            Tool.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: "Outil supprimé !" }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};