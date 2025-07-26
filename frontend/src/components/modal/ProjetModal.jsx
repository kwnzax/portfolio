import { useState } from "react";

function ProjetModal({ isOpen, onClose, onSuccess }) {
  const [minia, setMinia] = useState(null);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contrainte, setContrainte] = useState("");
  const [tags, setTags] = useState("");
  const [codeGithub, setCodeGithub] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length > 4) {
      alert("4 images max");
      return;
    }

    const formData = new FormData();
    formData.append("minia", minia);
    images.forEach((img) => formData.append("images", img));
    formData.append("title", title);
    formData.append("description", description);
    formData.append("contrainte", contrainte);
    formData.append("tags", tags); 
    formData.append("codeGithub", codeGithub);

    try {
      const res = await fetch("http://localhost:5000/api/projets", {
        method: "POST",
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
    <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl space-y-4"
      >
        <h2 className="text-xl font-bold">Ajouter un projet</h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setMinia(e.target.files[0])}
          required
        />

        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2 w-full"
        />

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files).slice(0, 4))}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <input
          type="text"
          placeholder="Contraintes"
          value={contrainte}
          onChange={(e) => setContrainte(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <input
          type="text"
          placeholder="Tags (ex: React, Node, MongoDB)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <input
          type="url"
          placeholder="Lien GitHub"
          value={codeGithub}
          onChange={(e) => setCodeGithub(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">
            Annuler
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProjetModal;
