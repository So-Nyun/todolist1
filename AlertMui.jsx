import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';

const AlertMui = (title,insert) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="warning">
          <AlertTitle>{title}</AlertTitle>
            <strong>{insert}</strong>
        </Alert>
    </Stack>
  );
}

export default AlertMui;