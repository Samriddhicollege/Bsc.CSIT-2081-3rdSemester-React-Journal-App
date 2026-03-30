// Reusable Button Component
// Supports multiple variants: primary, danger, ghost, secondary

import React from "react";

/**
 * @param {string} variant - "primary" | "danger" | "ghost" | "secondary"
 * @param {string} size    - "sm" | "md" | "lg"
 */
export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  className = "",
  title = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`btn btn--${variant} btn--${size} ${className}`}
    >
      {children}
    </button>
  );
}
