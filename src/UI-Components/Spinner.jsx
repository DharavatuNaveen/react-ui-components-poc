import React from 'react';

/**
 * A reusable React wrapper for `<org-spinner>`.
 * While it doesn't require complex event binding, this wrapper
 * keeps usage consistent across the application and isolates dependencies.
 */
const Spinner = ({
  size,
  color,
  label,
  ...rest
}) => {
  return (
    <org-spinner
      size={size}
      color={color}
      label={label}
      {...rest}
    ></org-spinner>
  );
};

export default Spinner;
