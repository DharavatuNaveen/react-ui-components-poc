import React, { useRef, useEffect } from 'react';

/**
 * A reusable React wrapper for `<org-select>`.
 * This solves passing arrays/objects to Lit web components from React 17.
 */
const Select = ({
  label,
  options = [],
  value,
  values,
  multiple,
  searchable,
  placeholder = 'Select an option',
  disabled,
  required,
  error,
  size = 'medium',
  onChange,
  ...rest
}) => {
  const selectRef = useRef(null);

  useEffect(() => {
    const el = selectRef.current;
    if (!el) return;

    // Direct object assignments bypassing React stringified attributes
    el.options = options;
    if (values !== undefined) el.values = values;

    const handleChange = (e) => {
      if (onChange) onChange(e);
    };

    el.addEventListener('org-select:change', handleChange);
    return () => {
      el.removeEventListener('org-select:change', handleChange);
    };
  }, [options, values, onChange]);

  return (
    <org-select
      ref={selectRef}
      label={label}
      value={value}
      multiple={multiple ? "" : undefined}
      searchable={searchable ? "" : undefined}
      required={required ? "" : undefined}
      placeholder={placeholder}
      disabled={disabled ? "" : undefined}
      error={error}
      size={size}
      {...rest}
    ></org-select>
  );
};

export default Select;
