import { useState, useRef, useEffect } from "react";

function ToolModal({ isOpen, onClose, onSuccess }) {
  const [name, setName] = useState("");
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
    formData.append("logo", logoFile);
    formData.append("name", name);

    try {
      const res = await fetch("http://localhost:3000/api/tools", {
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
        console.error("Échec de l’envoi :", await res.text());
      }
    } catch (err) {
      console.error("Erreur d’upload :", err);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="modalBackground">
      <div className="modal" ref={modalRef}>
        <form onSubmit={handleSubmit} className="modalContent">
          <h2>Nouvel outil</h2>

          <input
            id="logo"
            name="logo"
            type="file"
            accept="image/*"
            onChange={(e) => setLogoFile(e.target.files[0])}
            required
            hidden
          />

          <label htmlFor="logo" className="fileBtn">
            Ajouter un logo
          </label>

          <input
            name="name"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="modalBtn">
            <button type="button" onClick={onClose} > Annuler </button>
            <button type="submit" > Ajouter </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ToolModal;
