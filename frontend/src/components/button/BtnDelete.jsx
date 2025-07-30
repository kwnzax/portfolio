import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

function BtnDelete({ id, type, onDelete }) {

    const handleDelete = async () => {
        const confirm = window.confirm("Confirmer la suppression ?");
        if (!confirm || !id || !type) return;

        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/${type}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                onDelete && onDelete();
            } else {
                console.error("Erreur suppression :", await res.text());
            }
        } catch (err) {
            console.error("Erreur réseau :", err);
        }
    };

    return (
        <button className='trash' onClick={handleDelete} alt='delete'>
            <FontAwesomeIcon icon={faTrashCan} size="xl" />
        </button>
    )
}

export default BtnDelete