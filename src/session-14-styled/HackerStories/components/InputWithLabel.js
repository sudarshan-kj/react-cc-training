import React, { useEffect, useRef, useState } from "react";

const InputWithLabel = ({
  id,
  children,
  type = "text",
  value,
  onInputChange,
  isFocused,
}) => {
  const [clickAutoFocus, setClickAutoFocus] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current && clickAutoFocus) {
      inputRef.current.focus();
    }
  }, [clickAutoFocus]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        style={{
          display: "block",
          padding: "0.5rem",
          borderRadius: "24px",
          border: "none",
          outline: "none",
          width: "350px",
        }}
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

export default InputWithLabel;
