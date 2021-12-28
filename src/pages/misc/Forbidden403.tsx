import React from 'react';
import {Stack, Typography} from '@mui/material';

function Forbidden403() {
  return (
    <Stack spacing={2}>
      <Typography variant={'h4'}>403 Forbidden</Typography>
      <p>{'You don\'t have permission to access this page.'}</p>

    </Stack>
  );
}

export default Forbidden403;
