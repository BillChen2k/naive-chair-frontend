import React from 'react';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import Snackbar from '@mui/material/Snackbar';
import {Alert, Icon, IconButton} from '@mui/material';
import config from '@/config';
import {clearSnackBar} from '@/store/actions/snackbarActions';

export default function SnackBar() {
  const dispatch = useAppDispatch();

  const {open, message, severity} = useAppSelector( (state) => state.ui.snackbar);

  function handleClose() {
    dispatch(clearSnackBar());
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={config.snackBarAutoHiddenTime}
      onClose={handleClose}
      aria-describedby='client-snackbar'
    >
      <Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
        {message}
      </Alert>
    </Snackbar>
  );
}
