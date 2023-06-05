import React from 'react';
import { Box, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

interface ICustomSelectProps {
  label: string;
  name: string;
  width: string;
  options: { value: string; label: string }[];
  containerStyle: React.CSSProperties;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void; 
}

export default function CustomSelect({ label, name, options, containerStyle, value, onChange }: ICustomSelectProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event);
  };
  
  return (
    <Box>
      <FormControl size="small">
        <InputLabel id="demo-select-small">{label}</InputLabel>
        <Select
          name={name}
          size="small"
          label={label}
          sx={containerStyle}
          labelId="demo-select-small"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
