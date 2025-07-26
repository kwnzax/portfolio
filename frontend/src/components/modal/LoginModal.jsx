import { useState } from "react";

function LoginModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Échec de connexion");
        return;
      }

      localStorage.setItem("token", data.token);
      onSuccess(); 
      onClose();
    } catch (err) {
      setError("Erreur serveur. Réessaie plus tard.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-content">
        <h2>Connexion</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          onChange={handleChange}
          value={formData.password}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Se connecter</button>
        <button type="button" onClick={onClose}>Annuler</button>
      </form>
    </div>
  );
}

export default LoginModal;