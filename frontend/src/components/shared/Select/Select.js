import React from 'react';
import './Select.css';

const Select = ({
  options = [],
  value = '',
  onChange,
  label,
  placeholder = 'Select an option',
  required = false,
  error = '',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const selectId = props.id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  const selectClasses = [
    'select-container',
    fullWidth ? 'full-width' : '',
    error ? 'has-error' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={selectClasses}>
      {label && (
        <label htmlFor={selectId} className="select-label">
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>
      )}
      <div className="select-wrapper">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          className="select-element"
          required={required}
          {...props}
        >
          {placeholder && (
            <option value="" disabled={required}>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="select-arrow">
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {error && <div className="select-error">{error}</div>}
    </div>
  );
};

export default Select;
