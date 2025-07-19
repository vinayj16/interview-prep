import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Card.css';

const Card = ({
  children,
  className,
  variant = 'default',
  hoverable = false,
  padding = 'md',
  ...props
}) => {
  const cardClasses = classNames(
    'card',
    `card-${variant}`,
    `card-padding-${padding}`,
    {
      'card-hoverable': hoverable,
    },
    className
  );

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className, ...props }) => (
  <div className={classNames('card-header', className)} {...props}>
    {children}
  </div>
);

const CardBody = ({ children, className, ...props }) => (
  <div className={classNames('card-body', className)} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className, ...props }) => (
  <div className={classNames('card-footer', className)} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className, ...props }) => (
  <h3 className={classNames('card-title', className)} {...props}>
    {children}
  </h3>
);

const CardSubtitle = ({ children, className, ...props }) => (
  <p className={classNames('card-subtitle', className)} {...props}>
    {children}
  </p>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'outlined', 'elevated', 'filled']),
  hoverable: PropTypes.bool,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
};

Card.defaultProps = {
  variant: 'default',
  hoverable: false,
  padding: 'md',
};

CardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CardBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CardFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardSubtitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;

export default Card;
