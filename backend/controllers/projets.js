const Projet = require('../models/Projet');
const fs = require('fs');

exports.createProjet = (req, res, next) => {
  const projetObject = { ...req.body };
  delete projetObject._id;

  const tags = projetObject.tags;
  const tagsArray = typeof tags === "string" ? JSON.parse(tags) : tags;

  const projet = new Projet({
    ...projetObject,
    tags: tagsArray,
    minia: req.processedMinia, 
    images: req.processedImages, 
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
  const updatedProjet = { ...req.body };

  if (req.processedMinia) {
    updatedProjet.minia = req.processedMinia; 
  }

  if (req.processedImages && req.processedImages.length > 0) {
    updatedProjet.images = req.processedImages;
  }

  if (updatedProjet.tags) {
    try {
      updatedProjet.tags = typeof updatedProjet.tags === "string"
        ? JSON.parse(updatedProjet.tags)
        : updatedProjet.tags;
    } catch (e) {
      return res.status(400).json({ error: "Mauvais format pour les tags" });
    }
  }

  delete updatedProjet._id;

  Projet.findOne({ _id: req.params.id })
    .then((projet) => {
      if (!projet) {
        return res.status(404).json({ error: "Projet non trouvé" });
      }

      Projet.updateOne({ _id: req.params.id }, { ...updatedProjet, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Projet modifié avec succès !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};



exports.deleteProjet = (req, res, next) => {
  Projet.findOne({ _id: req.params.id })
    .then(projet => {
      if (!projet) {
        return res.status(404).json({ error: "Projet non trouvé" });
      }

      const miniaFilename = projet.minia.split('/images/')[1];
      if (miniaFilename) {
        fs.unlink(`images/${miniaFilename}`, err => {
          if (err) console.error("Erreur suppression minia :", err);
        });
      }

      if (Array.isArray(projet.images)) {
        projet.images.forEach(imageUrl => {
          const filename = imageUrl.split('/images/')[1];
          if (filename) {
            fs.unlink(`images/${filename}`, err => {
              if (err) console.error("Erreur suppression image :", err);
            });
          }
        });
      }

      Projet.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Projet supprimé !" }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};
