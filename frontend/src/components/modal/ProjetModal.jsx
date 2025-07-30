import { useState, useRef, useEffect } from "react";

function ProjetModal({ isOpen, onClose, onSuccess, mode = "add", projet = null }) {
  const [minia, setMinia] = useState(null);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contrainte, setContrainte] = useState("");
  const [tags, setTags] = useState("");
  const [codeGithub, setCodeGithub] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    if (mode === "edit" && projet) {
      setTitle(projet.title || "");
      setDescription(projet.description || "");
      setContrainte(projet.contrainte || "");
      setTags(Array.isArray(projet.tags) ? projet.tags.join(", ") : (projet.tags || ""));
      setCodeGithub(projet.codeGithub || "");
    } else if (mode === "add") {
      setTitle("");
      setDescription("");
      setContrainte("");
      setTags("");
      setCodeGithub("");
      setMinia(null);
      setImages([]);
    }
  }, [mode, projet, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (images.length > 4) {
      alert("4 images max");
      return;
    }

    const formData = new FormData();
    if (minia) formData.append("minia", minia);
    images.forEach((img) => formData.append("images", img));
    formData.append("title", title);
    formData.append("description", description);
    formData.append("contrainte", contrainte);
    formData.append("tags", JSON.stringify(tags.split(",").map(tag => tag.trim())));
    formData.append("codeGithub", codeGithub);

    const url = mode === "edit"
      ? `${import.meta.env.VITE_API_URL}/api/projets/${projet._id}`
      : `${import.meta.env.VITE_API_URL}/api/projets`;

    const method = mode === "edit" ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        console.error("Erreur serveur :", await res.text());
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modalBackground">
      <div className="modal" ref={modalRef}>
        <form onSubmit={handleSubmit} className="modalContent">
          <h2>{mode === "edit" ? "Modifier projet" : "Ajouter un projet"}</h2>

          <div className="addImgBtn">
            <input
              id="minia"
              type="file"
              name="minia"
              accept="image/*"
              onChange={(e) => setMinia(e.target.files[0])}
              {...(mode === "add" ? { required: true } : {})}
              hidden
            />
            <label htmlFor="minia" className="fileBtn">
              Ajouter une minia
            </label>

            <input
              id="images"
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files).slice(0, 4))}
              {...(mode === "add" ? { required: true } : {})}
              hidden
            />
            <label htmlFor="images" className="fileBtn">
              Ajouter des images
            </label>
          </div>

          <div className="previewContainer">
            {minia && <img src={URL.createObjectURL(minia)} alt="Minia preview" className="preview" />}

            {images.length > 0 && (
              <div className="imagePreviewContainer">
                {images.map((img, i) => (
                  <img key={i} src={URL.createObjectURL(img)} alt={`Preview ${i}`} className="preview" />
                ))}
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Contraintes"
            value={contrainte}
            onChange={(e) => setContrainte(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Tags (ex: React, Node, MongoDB)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />

          <input
            type="url"
            placeholder="Lien GitHub"
            value={codeGithub}
            onChange={(e) => setCodeGithub(e.target.value)}
            required
          />

          <div className="modalBtn">
            <button type="button" onClick={onClose}>Annuler</button>
            <button type="submit">{mode === "edit" ? "Modifier" : "Ajouter"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjetModal;