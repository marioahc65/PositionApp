import React from 'react';

const FormInput = ({ label, id, value, onChange, type = "text", required = false, errorMessage = "" }) => {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label htmlFor={id}>{label}</label><br />
      <input
        aria-label={label}
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        style={{ width: "100%", padding: "8px" }}
      />
      {errorMessage && <small style={{ color: 'red' }}>{errorMessage}</small>}
    </div>
  );
};

export default FormInput;
