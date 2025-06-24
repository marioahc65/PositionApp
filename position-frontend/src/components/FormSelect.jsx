import React from 'react';

const FormSelect = ({ label, id, value, onChange, options }) => {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label htmlFor={id}>{label}</label><br />
      <select
        aria-label={label}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        style={{ width: "100%", padding: "8px" }}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
