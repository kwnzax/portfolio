import { useState } from "react";

function ToolModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    logo: "",
    name: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/tools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
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
        <input name="logo" type="file" placeholder="Logo URL" onChange={handleChange} required />
        <input name="name" placeholder="Nom" onChange={handleChange} required />
        <button type="submit">Ajouter Outil</button>
      </form>
    </div>
  );
}

export default ToolModal