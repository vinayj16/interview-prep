import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import Button from './Button';
import './Modal.css';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnEsc = true,
  closeOnOverlayClick = true,
  showOverlay = true,
  className,
  headerClassName,
  bodyClassName,
  footerClassName,
  footer,
  ariaLabelledBy,
  ariaDescribedby,
}) => {
  const modalRef = useRef(null);
  const lastFocusedElement = useRef(null);

  // Handle ESC key press
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && closeOnEsc) {
        onClose();
      }
    },
    [closeOnEsc, onClose]
  );

  // Handle click outside modal
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === modalRef.current) {
      onClose();
    }
  };

  // Set up event listeners and focus management
  useEffect(() => {
    if (isOpen) {
      // Save the element that had focus before the modal opened
      lastFocusedElement.current = document.activeElement;
      
      // Add event listeners
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      
      // Focus the modal when it opens
      const modalElement = modalRef.current;
      if (modalElement) {
        modalElement.focus();
      }
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        
        // Return focus to the element that had focus before the modal opened
        if (lastFocusedElement.current) {
          lastFocusedElement.current.focus();
        }
      };
    }
  }, [isOpen, handleKeyDown]);

  // Don't render anything if the modal is closed
  if (!isOpen) {
    return null;
  }

  // Create the modal content
  const modalContent = (
    <div 
      className={classNames('modal-overlay', { 'with-overlay': showOverlay })}
      onClick={handleOverlayClick}
      ref={modalRef}
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedby}
    >
      <div 
        className={classNames('modal', `modal-${size}`, className)}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className={classNames('modal-header', headerClassName)}>
            {title && <h3 className="modal-title" id={ariaLabelledBy}>{title}</h3>}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="small"
                onClick={onClose}
                className="modal-close-button"
                aria-label="Close modal"
              >
                <FaTimes />
              </Button>
            )}
          </div>
        )}
        
        {/* Body */}
        <div className={classNames('modal-body', bodyClassName)}>
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className={classNames('modal-footer', footerClassName)}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  // Use createPortal to render the modal outside the normal DOM hierarchy
  return createPortal(modalContent, document.body);
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
  showCloseButton: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
  closeOnOverlayClick: PropTypes.bool,
  showOverlay: PropTypes.bool,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  footerClassName: PropTypes.string,
  footer: PropTypes.node,
  ariaLabelledBy: PropTypes.string,
  ariaDescribedby: PropTypes.string,
};

Modal.defaultProps = {
  size: 'md',  
  showCloseButton: true,
  closeOnEsc: true,
  closeOnOverlayClick: true,
  showOverlay: true,
};

export default Modal;
