import React from 'react';
import { TextField } from '@mui/material';

interface ICustomTextFieldProps {
  label: string;
  type: "text" | "number" | "password";
  name: string;
  placeholder: string;
  containerStyle: React.CSSProperties;
  value: string | number;
  onChange: (e: React.ChangeEvent<any>) => void;
}

export default function CustomTextField({ label, type, name, placeholder, containerStyle, value , onChange }: ICustomTextFieldProps) {
  const handleChange = (e: React.ChangeEvent<any>) => {
    onChange(e);
  };
  return (
    <TextField
      label={label}
      type={type}
      name={name}
      placeholder={placeholder}
      size="small"
      sx={containerStyle}
      value={value}
      onChange={handleChange}
    />
  );
}
