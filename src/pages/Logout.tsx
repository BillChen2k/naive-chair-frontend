import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import {Box, Button, Stack, Typography} from '@mui/material';
import useAuth from '@/services/useAuth';

function Logout() {
  const [confirm, setConfirm] = useState(false);
  if (confirm) {
    const auth = useAuth();
    auth.signOut();
  }
  return (
      <Stack spacing={2} sx={{width: '20rem'}}>
        {confirm && (
          <Navigate to={'/'} />
        )}
        <Typography variant={'h6'}>Are you sure to log out?</Typography>
        <Button variant={'contained'} fullWidth color={'warning'} onClick={() => setConfirm(true)}>Confirm</Button>
      </Stack>
  );
}

export default Logout;
