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
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={config.snackBarAutoHideDuration}
      onClose={handleClose}
      onClick={handleClose}
    >
      <Alert variant={'filled'} onClose={handleClose} severity={severity} sx={{width: '100%'}}>
        {message}
      </Alert>
    </Snackbar>
  );
}
