import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const InputBox = ({
    placeholder,
    value,
    onChange
}) => {

    const onChangeHandler = (e) => {
        if (typeof onChange === "function") onChange(e.target.value)
    }



  return (
    <Box >
      <TextField 
        label={placeholder}
        value={value}
        onChange={onChangeHandler}/>
    </Box>
  );
}


export default InputBox;