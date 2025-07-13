import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Input.css';

const Input = forwardRef(({
  id,
  label,
  type = 'text',
  size = 'medium',
  fullWidth = false,
  error,
  helperText,
  startIcon,
  endIcon,
  className,
  labelClassName,
  inputClassName,
  containerClassName,
  ...props
}, ref) => {
  const inputClasses = classNames(
    'input-field',
    `input-${size}`,
    {
      'input-full-width': fullWidth,
      'input-with-start-icon': startIcon,
      'input-with-end-icon': endIcon,
      'input-error': error,
    },
    inputClassName
  );

  const containerClasses = classNames(
    'input-container',
    {
      'input-container-full-width': fullWidth,
    },
    containerClassName
  );

  const labelClasses = classNames('input-label', labelClassName);
  const helperTextClasses = classNames('input-helper-text', {
    'input-error-text': error,
  });

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
          {props.required && <span className="input-required">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        {startIcon && <span className="input-icon start">{startIcon}</span>}
        <input
          id={id}
          ref={ref}
          type={type}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error || helperText ? `${id}-helper-text` : undefined}
          {...props}
        />
        {endIcon && <span className="input-icon end">{endIcon}</span>}
      </div>
      {(error || helperText) && (
        <span id={`${id}-helper-text`} className={helperTextClasses}>
          {error || helperText}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.oneOf([
    'text',
    'email',
    'password',
    'number',
    'tel',
    'url',
    'search',
    'date',
    'time',
    'datetime-local',
    'month',
    'week',
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  size: 'medium',
  fullWidth: false,
};

export default Input;
