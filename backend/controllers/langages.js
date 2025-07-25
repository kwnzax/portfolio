const Langage = require('../models/Langage');
const fs = require('fs');

exports.createLangage = (req, res, next) => {
    const langageObject = JSON.parse(req.body.book)
    delete langageObject._id;
    delete langageObject._userId

    const langage = new Langage({
        ...langageObject,
        logo: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    });
    langage.save()
        .then(() => res.status(201).json({ message: 'Langage enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllLangages = (req, res, next) => {
    Langage.find()
        .then(langages => res.status(200).json(langages))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneLangage = (req, res, next) => {
    Langage.findOne({ _id: req.params.id })
        .then(langage => res.status(200).json(langage))
        .catch(error => res.status(404).json({ error }));
}

exports.modifyLangage = (req, res, next) => {
    const langageObject = req.file ? {
        ...JSON.parse(req.body.langage),
        logo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete langageObject._userId;
    Langage.findOne({ _id: req.params.id })
        .then((langage) => {
            if (langage.userId != req.auth.userId) {
                res.status(403).json({ message: 'Not authorized' });
            } else {
                Langage.updateOne({ _id: req.params.id }, { ...langageObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Langage modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

exports.deleteLangage = (req, res, next) => {
    Langage.findOne({ _id: req.params.id })
        .then(langage => {
            if (langage.userId != req.auth.userId) {
                res.status(403).json({ message: 'Not authorized' });
            } else {
                const filename = langage.images.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Langage.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Langage supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};
