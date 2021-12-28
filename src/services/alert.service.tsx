import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import MuiAlert, {AlertColor, AlertProps} from '@mui/material/Alert';
import {ErrorMessage} from '@/containers/Login';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface IAlertMessageProps {
  alertInfo: ErrorMessage
}

export function AlertMessage(props: IAlertMessageProps) {
  const {alertType, message} = props.alertInfo;
  const [open, setOpen] = React.useState(true);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{width: '100%'}}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertType} sx={{width: '100%'}}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
