const multer = require("multer")
const cloudinary = require('./cloudinary');
const sharp = require("sharp")
const fs = require("fs").promises

const MIME_TYPES = {
    "image/jpg": "webp",
    "image/jpeg": "webp",
    "image/png": "webp",
}

const storage = multer.memoryStorage()
const uploadProjet = multer({ storage }).fields([
    { name: "minia", maxCount: 1 },
    { name: "images", maxCount: 4 },
]);

const uploadLogo = multer({ storage }).single("logo");

const processLogo = async (req, res, next) => {
    if (!req.file) return next();

    try {
        const name = req.body.name.split(" ").join("_");
        const extension = MIME_TYPES[req.file.mimetype];
        const fileName = name + Date.now() + "." + extension

        const buffer = await sharp(req.file.buffer)
            .resize({ height: 500 })
            .toFormat("webp")
            .toBuffer();

        const imagePath = `images/${fileName}`;
        await fs.writeFile(imagePath, buffer);

        req.processedLogo = fileName;
        next();
    } catch (error) {
        console.error("Error processing logo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const processImages = async (req, res, next) => {
    if (!req.files || (!req.files["minia"] && !req.files["images"])) {
      return next();
    }
  
    try {
      const projetObject = req.body;
      const name = projetObject.title?.split(" ").join("_") || "image";
      const cloudinaryImages = [];

      if (req.files["images"]) {
        for (const file of req.files["images"]) {
          const extension = MIME_TYPES[file.mimetype];
  
          const buffer = await sharp(file.buffer)
            .resize({
              height: 700,
              fit: sharp.fit.outside,
              position: sharp.strategy.entropy,
            })
            .toFormat("webp")
            .toBuffer();
  
          const uploadResult = await cloudinary.uploader.upload_stream(
            {
              folder: "portfolio",
              public_id: `${name}_${Date.now()}`
            },
            (error, result) => {
              if (error) throw error;
              cloudinaryImages.push(result.secure_url);
            }
          );

          const { Readable } = require("stream");
          Readable.from(buffer).pipe(uploadResult);
          await new Promise((resolve) => uploadResult.on("finish", resolve));
        }
      }

      let cloudinaryMinia = "";
      if (req.files["minia"]) {
        const minia = req.files["minia"][0];
        const buffer = await sharp(minia.buffer)
          .resize({ height: 700, fit: sharp.fit.outside })
          .toFormat("webp")
          .toBuffer();
  
        const uploadResult = await cloudinary.uploader.upload_stream(
          {
            folder: "portfolio",
            public_id: `${name}_minia_${Date.now()}`
          },
          (error, result) => {
            if (error) throw error;
            cloudinaryMinia = result.secure_url;
          }
        );
  
        const { Readable } = require("stream");
        Readable.from(buffer).pipe(uploadResult);
        await new Promise((resolve) => uploadResult.on("finish", resolve));
      }
  
      req.cloudinaryImages = cloudinaryImages;
      req.cloudinaryMinia = cloudinaryMinia;
  
      next();
    } catch (error) {
      console.error("Erreur traitement des images Cloudinary :", error);
      res.status(500).json({ error: "Erreur serveur lors du traitement des images." });
    }
  };

module.exports = { uploadProjet, processImages, uploadLogo, processLogo };