import React from "react";

interface ErrorProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div style={{ color: "red", margin: "1rem 0" }}>
      <strong>Error: </strong> {message}
    </div>
  );
};

export default ErrorMessage;
