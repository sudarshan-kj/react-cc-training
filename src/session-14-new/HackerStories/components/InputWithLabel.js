import React, { useEffect, useRef, useState } from "react";

const InputWithLabel = ({
  id,
  children,
  type = "text",
  value,
  onInputChange,
}) => {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        style={{
          display: "block",
          padding: "1rem",
          border: "none",
          outline: "none",
          borderRadius: "4px",
          margin: "1rem 0",
        }}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

export default InputWithLabel;
