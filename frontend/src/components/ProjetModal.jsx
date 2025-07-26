import { useState } from "react";

function ProjetModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    minia: "",
    title: "",
    images: "",
    description: "",
    contrainte: "",
    tags: "",
    codeGithub: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      ...formData,
      images: formData.images.split(","),
      tags: formData.tags.split(",")
    };
    const res = await fetch("http://localhost:5000/api/projets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (res.ok) {
      onSuccess();
      onClose();
    }
  };

  if (!isOpen) return null;
  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input name="minia" type="file" placeholder="Minia" onChange={handleChange} required />
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <input name="images" type="file" placeholder="Images (comma-separated)" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <input name="contrainte" placeholder="Contrainte" onChange={handleChange} required />
        <input name="tags" placeholder="Tags (comma-separated)" onChange={handleChange} required />
        <input name="codeGithub" placeholder="GitHub Link" onChange={handleChange} required />
        <button type="submit">Ajouter Projet</button>
      </form>
    </div>
  );
}

export default ProjetModal