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
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
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
            window.location.reload();

        } catch (err) {
            console.error("Erreur dans la requête:", err);
            setError("Erreur serveur. Réessaie plus tard.");
        }
    };

    if (!isOpen) return null;

    return (
            <div className="loginModal">
                <form onSubmit={handleSubmit} >
                    <div className="loginInput">
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
                    </div>
                    <div className="loginBtn">
                        <button type="button" onClick={onClose}>Annuler</button>
                        <button type="submit">Se connecter</button>
                    </div>
                </form>
            </div>
    );
}

export default LoginModal;