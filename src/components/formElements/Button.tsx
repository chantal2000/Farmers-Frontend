import React from 'react';
import { Button } from '@mui/material';

interface ICustomButtonProps {
  label: string | JSX.Element;
  type: 'button'| 'submit' | 'reset';
  containerStyle: React.CSSProperties;
  onClick?: () => void;
  color: 'primary' | 'success'
  disabled?: boolean; 
 
}

export default function CustomButton({ label, type, containerStyle, onClick, disabled, color }: ICustomButtonProps) {
  return (
    <Button
      style={containerStyle}
      type={type}
      onClick={onClick}
      disabled={disabled}
      color={color}
    >
      {label}
    </Button>
  );
}
