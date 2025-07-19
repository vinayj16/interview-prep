import React from 'react';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) => {
  const baseClassName = 'btn';
  const variantClassName = `btn-${variant}`;
  const sizeClassName = `btn-${size}`;
  const fullWidthClassName = fullWidth ? 'btn-full-width' : '';
  
  const buttonClasses = [
    baseClassName,
    variantClassName,
    sizeClassName,
    fullWidthClassName,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
