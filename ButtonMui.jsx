import * as React from 'react';
import Button from '@mui/material/Button';

const ButtonMui = ({
    name,
    onClick
}) => {

    const handlerOnClick = (e) => {
        // e.stopPropagation();
        if(typeof onClick === 'function') onClick();
    }

    return (
        <div>
            <Button
                variant="contained"
                onClick={handlerOnClick}
            >
                {name}
            </Button>
            </div>
      );

}

export default ButtonMui;