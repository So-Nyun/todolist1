import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectBoxMui = ({ name, arr, onChange, value }) => {

  const handleChange = (e) => {
    if (typeof onChange ==="function") onChange(e.target.value) //자식에서 부모로 값을 넘기는 코드
  }
  return (
    <FormControl >
      <InputLabel>{name}</InputLabel>
      <Select
        onChange={handleChange}
        defaultValue={arr[0]}
        value={value ? value : arr[0]}
        
      >
          {arr.map((item,index) => {
            return <MenuItem key={index} value={item}>{item}</MenuItem>
          })}
 
      </Select>
    </FormControl>
  )
}

export default SelectBoxMui;
