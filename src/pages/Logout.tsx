import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import {Box, Button, Stack, Typography} from '@mui/material';
import useAuth from '@/services/useAuth';
import {useDispatch} from 'react-redux';
import openSnackBar from '@/store/actions/snackbarActions';

function Logout() {
  const [confirm, setConfirm] = useState(false);
  const dispatch = useDispatch();
  if (confirm) {
    const auth = useAuth();
    const username = auth.userObj.username;
    auth.signOut();
    dispatch(openSnackBar(`Logged out ${username}.`, 'success'));
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
