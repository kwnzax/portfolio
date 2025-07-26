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
            if (tool.userId != req.auth.userId) {
                res.status(403).json({ message: 'Not authorized' });
            } else {
                const filename = tool.images.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Tool.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Outil supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};