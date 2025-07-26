const Skill = require('../models/Skill');
const fs = require('fs');

exports.createSkill = (req, res, next) => {
    const skillObject = JSON.parse(req.body.skill)
    delete skillObject._id;
    delete skillObject._userId

    const skill = new Skill({
        ...skillObject,
        logo: `${req.protocol}://${req.get("host")}/images/${req.processedLogo}`,
    });
    skill.save()
        .then(() => res.status(201).json({ message: 'Skill enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllSkills = (req, res, next) => {
    Skill.find()
        .then(skills => res.status(200).json(skills))
        .catch(error => res.status(400).json({ error }));
}

exports.modifySkill = (req, res, next) => {
    const skillObject = req.file ? {
        ...JSON.parse(req.body.skill),
        logo: `${req.protocol}://${req.get('host')}/images/${req.processedLogo}`
    } : { ...req.body };

    delete skillObject._userId;
    Skill.findOne({ _id: req.params.id })
        .then((skill) => {
            if (skill.userId != req.auth.userId) {
                res.status(403).json({ message: 'Not authorized' });
            } else {
                Skill.updateOne({ _id: req.params.id }, { ...skillObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Skill modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

exports.deleteSkill = (req, res, next) => {
    Skill.findOne({ _id: req.params.id })
        .then(skill => {
            if (skill.userId != req.auth.userId) {
                res.status(403).json({ message: 'Not authorized' });
            } else {
                const filename = skill.images.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Skill.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Skill supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};
