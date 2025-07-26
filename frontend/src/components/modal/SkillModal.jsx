import { useState } from "react";

function SkillModal({ isOpen, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [logoFile, setLogoFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("level", level);
    formData.append("logo", logoFile);

    try {
      const res = await fetch("http://localhost:3000/api/skills", {
        method: "POST",
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
    <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">Ajouter un skill</h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogoFile(e.target.files[0])}
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <input
          type="number" 
          name="level"
          placeholder="Niveau (0–100)"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="border p-2 w-full"
          required
          min={0}
          max={100}
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

export default SkillModal;
