import React, { useRef, useEffect } from 'react';

/**
 * A reusable React wrapper for `<org-input>`.
 */
const Input = ({
  label,
  value,
  type = 'text',
  placeholder,
  disabled,
  required,
  readonly,
  error,
  success,
  helper,
  maxlength,
  size = 'medium',
  prefixIcon,
  suffixIcon,
  onChange,
  ...rest
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;

    const handleInput = (e) => {
      if (onChange) onChange(e);
    };

    // Listen to org-input:input custom event
    el.addEventListener('org-input:input', handleInput);
    return () => {
      el.removeEventListener('org-input:input', handleInput);
    };
  }, [onChange]);

  return (
    <org-input
      ref={inputRef}
      label={label}
      value={value}
      type={type}
      placeholder={placeholder}
      disabled={disabled ? "" : undefined}
      required={required ? "" : undefined}
      readonly={readonly ? "" : undefined}
      error={error}
      success={success}
      helper={helper}
      maxlength={maxlength}
      size={size}
      {...rest}
    >
      {prefixIcon && <span slot="prefix">{prefixIcon}</span>}
      {suffixIcon && <span slot="suffix">{suffixIcon}</span>}
    </org-input>
  );
};

export default Input;
