import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FaSpinner } from 'react-icons/fa';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  startIcon,
  endIcon,
  className,
  ...props
}) => {
  const buttonClasses = classNames(
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    {
      'btn-full-width': fullWidth,
      'btn-loading': isLoading,
      'btn-disabled': disabled,
    },
    className
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <span className="btn-spinner">
          <FaSpinner className="spinner-icon" />
        </span>
      )}
      {startIcon && !isLoading && <span className="btn-icon start">{startIcon}</span>}
      <span className="btn-content">{children}</span>
      {endIcon && !isLoading && <span className="btn-icon end">{endIcon}</span>}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'outline',
    'ghost',
    'danger',
    'success',
    'warning',
    'text',
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  variant: 'primary',
  size: 'medium',
  fullWidth: false,
  isLoading: false,
  disabled: false,
  type: 'button',
};

export default Button;
