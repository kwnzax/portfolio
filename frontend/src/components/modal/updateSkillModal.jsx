import { useState } from "react";

function UpdateSkillModal({ skill, onClose, onUpdate }) {
  const [level, setLevel] = useState(skill.level || 0);
  const [logo, setLogo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();

    if (logo) {
      formData.append("logo", logo);
    }

    const skillData = { level };
    formData.append("skill", JSON.stringify(skillData));

    try {
      const res = await fetch(`http://localhost:3000/api/skills/${skill._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        onUpdate();
        onClose();
      } else {
        console.error("Erreur de mise à jour :", await res.text());
      }
    } catch (err) {
      console.error("Erreur de requête :", err);
    }
  };

  return (
    <div className="modalBackground">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <h2>Modifier un skill</h2>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files[0])}
          />
          <input
            type="number"
            name="level"
            placeholder="Niveau (0–100)"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            min={0}
            max={100}
          />
          <div>
            <button type="button" onClick={onClose}>Annuler</button>
            <button type="submit">Modifier</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateSkillModal;