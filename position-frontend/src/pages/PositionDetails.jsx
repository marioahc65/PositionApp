import { useEffect, useState } from "react";
import { getPositionById, updatePosition } from "../api/positions";
import { usePositionsContext } from "../context/PositionsContext";

export function PositionDetails({ id, onBack }) {
  const { triggerRefresh } = usePositionsContext();
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPositionById(id)
      .then(setForm)
      .catch(() => setError("No se pudo cargar la posición"));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  // Validación del título
  if (form.title.length > 100) {
    setError("El título no puede tener más de 100 caracteres");
    return;
  }

  // Validación de otros campos
  if (form.description.length > 1000) {
    setError("La descripción no puede tener más de 1000 caracteres");
    return;
  }

  // Validaciones para campos requeridos y presupuesto
  const requiredFields = [
    "title",
    "description",
    "location",
    "recruiterId",
    "departmentId",
    "budget",
  ];
  for (const field of requiredFields) {
    if (
      form[field] === null ||
      form[field] === undefined ||
      (typeof form[field] === "string" && form[field].trim() === "")
    ) {
      setError(`El campo ${field} es obligatorio`);
      return;
    }
  }

  if (Number(form.budget) <= 0 || isNaN(Number(form.budget))) {
    setError("El presupuesto debe ser un número positivo");
    return;
  }

  setLoading(true);
  try {
    await updatePosition(id, form);
    setSuccess("¡Actualizado correctamente!");
    triggerRefresh();
    onBack();
  } catch (err) {
    setError("Error al actualizar");
  } finally {
    setLoading(false);
  }
};



  if (!form) return <p>Cargando...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
      <button onClick={onBack}>← Volver</button>
      <h2>Editar Posición</h2>
      {error && (
        <p role="alert" style={{ color: "red" }}>
          {error}
        </p>
      )}
      {success && (
        <p role="status" style={{ color: "green" }}>
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        {[
          { id: "title", label: "Título" },
          { id: "description", label: "Descripción" },
          { id: "location", label: "Ubicación" },
          { id: "recruiterId", label: "Recruiter ID" },
          { id: "departmentId", label: "Department ID" },
          { id: "budget", label: "Presupuesto", type: "number" },
        ].map(({ id, label, type = "text" }) => (
          <div key={id} style={{ marginBottom: 12 }}>
            <label htmlFor={id}>{label}</label>
            <br />
            <input
              id={id}
              name={id}
              type={type}
              value={form[id]}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
            {id === "title" && (
              <small
                style={{ display: "block", textAlign: "right", color: "#666" }}
              >
                {form.title.length} / 100
              </small>
            )}
            {id === "description" && (
              <small
                style={{ display: "block", textAlign: "right", color: "#666" }}
              >
                {form.description.length} / 1000
              </small>
            )}
          </div>
        ))}

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="status">Estado</label>
          <br />
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="draft">Draft</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="closingDate">Fecha de cierre</label>
          <br />
          <input
            id="closingDate"
            name="closingDate"
            type="date"
            value={form.closingDate?.split("T")[0] || ""}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: "10px 16px", width: "100%" }}
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
}
