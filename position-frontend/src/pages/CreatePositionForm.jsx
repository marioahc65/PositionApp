import React, { useState } from "react";
import { createPosition } from "../api/positions";
import { usePositionsContext } from "../context/PositionsContext"; // Importamos el context
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";

const CreatePositionForm = () => {
  const { triggerRefresh } = usePositionsContext(); // Accedemos a triggerRefresh
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    recruiterId: "",
    departmentId: "",
    budget: "",
    closingDate: null,
    status: "draft", // Valor por defecto para el estado
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title) errors.title = "El título es obligatorio";
    if (formData.title.length > 100)
      errors.title = "El título no puede tener más de 100 caracteres";

    if (!formData.description)
      errors.description = "La descripción es obligatoria";
    if (formData.description.length > 1000)
      errors.description =
        "La descripción no puede tener más de 1000 caracteres";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await createPosition(formData);

        setSuccess("¡Posición creada!");

        triggerRefresh();

        setFormData({
          title: "",
          description: "",
          location: "",
          recruiterId: "",
          departmentId: "",
          budget: "",
          closingDate: "",
          status: "draft",
        });
      } catch (err) {
        setError("Error al crear la posición: " + err.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Formulario de creación de posición"
    >
      <h2>Crear Nueva Posición</h2>

      <FormInput
        label="Título"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        errorMessage={errors.title}
      />
      {formData.title && (
        <small style={{ display: "block", textAlign: "right", color: "#666" }}>
          {formData.title.length} / 100
        </small>
      )}

      <FormInput
        label="Descripción"
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        errorMessage={errors.description}
      />
      {formData.description && (
        <small style={{ display: "block", textAlign: "right", color: "#666" }}>
          {formData.description.length} / 1000
        </small>
      )}

      <FormInput
        label="Ubicación"
        id="location"
        name="location"
        value={formData.location}
        onChange={handleChange}
      />

      <FormInput
        label="Recruiter ID"
        id="recruiterId"
        name="recruiterId"
        value={formData.recruiterId}
        onChange={handleChange}
      />

      <FormInput
        label="Department ID"
        id="departmentId"
        name="departmentId"
        value={formData.departmentId}
        onChange={handleChange}
      />

      <FormInput
        label="Presupuesto"
        id="budget"
        name="budget"
        type="number"
        value={formData.budget}
        onChange={handleChange}
      />

      <FormSelect
        label="Estado"
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        options={[
          { value: "draft", label: "Draft" },
          { value: "open", label: "Open" },
          { value: "closed", label: "Closed" },
          { value: "archived", label: "Archived" },
        ]}
      />

      <FormInput
        label="Fecha de cierre"
        id="closingDate"
        name="closingDate"
        type="date"
        value={formData.closingDate || ""}
        onChange={handleChange}
        errorMessage={errors.closingDate}
      />

      <button type="submit">Crear</button>

      {success && (
        <div
          role="status"
          style={{
            color: "white",
            background: "green",
            padding: "8px",
            marginBottom: 12,
          }}
        >
          {success}
        </div>
      )}

      {error && (
        <div
          role="alert"
          style={{
            color: "white",
            background: "crimson",
            padding: "8px",
            marginBottom: 12,
          }}
        >
          {error}
        </div>
      )}
    </form>
  );
};

export default CreatePositionForm;
