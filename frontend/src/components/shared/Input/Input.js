import React from 'react';
import './Input.css';

const Input = ({
  type = 'text',
  label,
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  error = '',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const inputId = name || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const inputClasses = [
    'input-field',
    fullWidth ? 'full-width' : '',
    error ? 'has-error' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={inputClasses}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="input-element"
        {...props}
      />
      {error && <div className="input-error">{error}</div>}
    </div>
  );
};

export default Input;
