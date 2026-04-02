import React, { useRef, useEffect } from 'react';

/**
 * A reusable React wrapper for the `<org-button>` Web Component.
 * This abstracts away the need to use refs for handling custom events 
 * and boolean properties.
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading,
  disabled,
  icon,
  onClick,
  ...rest
}) => {
  const btnRef = useRef(null);

  // Safely attach the custom Web Component event to standard React onClick
  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    const handleClick = (e) => {
      if (onClick) onClick(e);
    };

    el.addEventListener('org-button:click', handleClick);

    // Cleanup listener on unmount
    return () => {
      el.removeEventListener('org-button:click', handleClick);
    };
  }, [onClick]);

  // Handle boolean attributes properly for Web Components
  const loadingAttr = loading ? "" : undefined;
  const disabledAttr = disabled ? "" : undefined;

  return (
    <org-button
      ref={btnRef}
      variant={variant}
      size={size}
      loading={loadingAttr}
      disabled={disabledAttr}
      {...rest}
    >
      {/* If an icon string/element is passed, wrap it in the required slot */}
      {icon && <span slot="icon">{icon}</span>}

      {children}
    </org-button>
  );
};

export default Button;
