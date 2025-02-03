import React, { FC } from 'react';

interface ButtonProps {
  text: string;
}

const Button: FC<ButtonProps> = ({ text }) => {
  return (
    <button
      type="submit"
      className="w-full mt-6 bg-primary-a0 py-3 rounded-lg hover:bg-primary-a0/50 transition"
    >
      {text}
    </button>
  );
}

export default Button;