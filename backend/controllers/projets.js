const Projet = require('../models/Projet');
const fs = require('fs');

exports.createProjet = (req, res, next) => {
    const projetObject = JSON.parse(req.body.projet)
    delete projetObject._id;
    delete projetObject._userId

    const projet = new Projet({
        ...projetObject,
        images: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    });
    projet.save()
        .then(() => res.status(201).json({ message: 'Projet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllProjets = (req, res, next) => {
    Projet.find()
        .then(projets => res.status(200).json(projets))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneProjet = (req, res, next) => {
    Projet.findOne({ _id: req.params.id })
        .then(projet => res.status(200).json(projet))
        .catch(error => res.status(404).json({ error }));
}

exports.modifyProjet = (req, res, next) => {
    const projetObject = req.file ? {
        ...JSON.parse(req.body.projet),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete projetObject._userId;
    Projet.findOne({ _id: req.params.id })
        .then((projet) => {
            if (projet.userId != req.auth.userId) {
                res.status(403).json({ message: 'Not authorized' });
            } else {
                Projet.updateOne({ _id: req.params.id }, { ...projetObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Projet modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

exports.deleteProjet = (req, res, next) => {
    Projet.findOne({ _id: req.params.id })
        .then(projet => {
            if (projet.userId != req.auth.userId) {
                res.status(403).json({ message: 'Not authorized' });
            } else {
                const filename = projet.images.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Projet.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Projet supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

