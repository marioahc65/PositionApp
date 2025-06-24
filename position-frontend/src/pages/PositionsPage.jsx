import { useEffect, useState } from "react";
import { getPositions, deletePosition } from "../api/positions";
import { usePositionsContext } from "../context/PositionsContext";

export function PositionsPage({ onSelect }) {
  const { refreshKey, triggerRefresh } = usePositionsContext();
  const [positions, setPositions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Definir el estado loading

  useEffect(() => {
    setLoading(true); // Establecer loading a true cuando empiece la solicitud
    getPositions()
      .then((data) => {
        setPositions(data);
        setLoading(false); // Establecer loading a false cuando los datos son recibidos
      })
      .catch((err) => {
        setError("Error al obtener posiciones");
        setLoading(false); // También establecer loading a false si hay un error
      });
  }, [refreshKey]);

const handleDelete = async (id) => {
  const position = positions.find((p) => p.id === id);
  const confirmText = `¿Eliminar la posición "${position?.title}"?`;
  if (!window.confirm(confirmText)) return;

  try {
    setLoading(true); // Establecer loading a true cuando empiece la eliminación
    await deletePosition(id); // Llamada a la API para eliminar
    triggerRefresh();
    setLoading(false); // Establecer loading a false después de eliminar
  } catch (err) {
    console.error("Error al eliminar la posición:", err); // Imprimir el error en la consola
    setError(`Error al eliminar la posición: ${err.message || err}`); // Mostrar el mensaje de error completo
    setLoading(false); // Establecer loading a false si hay un error
  }
};


  return (
    <div>
      <h1>Lista de Posiciones</h1>

      {loading && <p>Cargando...</p>} {/* Mostrar mensaje de carga */}

      {error && (
        <p role="alert" style={{ color: "red" }}>
          {error}
        </p>
      )}

      {positions.length === 0 ? (
        <p>No hay posiciones disponibles.</p>
      ) : (
        <ul aria-label="Listado de posiciones">
          {positions.map((p) => (
            <li key={p.id}>
              <strong
                onClick={() => onSelect(p.id)}
                style={{ cursor: "pointer", color: "blue" }}
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && onSelect(p.id)}
              >
                {p.title}
              </strong>{" "}
              – {p.status} – {p.location}
              <button
                onClick={() => handleDelete(p.id)}
                style={{ marginLeft: "10px", color: "red" }}
                aria-label={`Eliminar ${p.title}`}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
