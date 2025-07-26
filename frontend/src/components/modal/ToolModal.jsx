import { useState } from "react";

function ToolModal({ isOpen, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [logoFile, setLogoFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("logo", logoFile); 
    formData.append("name", logoname);

    try {
      const res = await fetch("http://localhost:3000/api/tools", {
        method: "POST",
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
    <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">Ajouter un outil</h2>

        <input
          name="logo"
          type="file"
          accept="image/*"
          onChange={(e) => setLogoFile(e.target.files[0])}
          required
        />

        <input
          name="name"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

export default ToolModal;
