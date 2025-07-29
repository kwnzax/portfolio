import { useState, useRef, useEffect } from "react";

function SkillModal({ isOpen, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const modalRef = useRef(null);

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

    const formData = new FormData();
    formData.append("name", name);
    formData.append("level", level);
    formData.append("logo", logoFile);

    try {
      const res = await fetch("http://localhost:3000/api/skills", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        console.error("Erreur d’envoi :", await res.text());
      }
    } catch (err) {
      console.error("Erreur :", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modalBackground">
      <div className="modal" ref={modalRef}>
        <form onSubmit={handleSubmit} className="modalContent">
          <h2>Nouveau skill</h2>

          <input
            id="logo"
            type="file"
            name="logo"
            accept="image/*"
            onChange={(e) => setLogoFile(e.target.files[0])}
            required
            style={{ display: "none" }}
          />

          <label htmlFor="logo" className="fileBtn">
            Ajouter un logo
          </label>

          <input
            type="text"
            name="name"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="number"
            name="level"
            placeholder="Niveau (0–100)"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
            min={0}
            max={100}
          />

          <div className="modalBtn">
            <button type="button" onClick={onClose} > Annuler </button>
            <button type="submit"> Ajouter </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SkillModal;
