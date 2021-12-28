// Reference: https://browntreelabs.com/snackbars-in-react-redux-and-material-ui/

export type SnackbarAction = {
  type: 'SNACKBAR_OPEN' | 'SNACKBAR_CLEAR';
  payload?: {
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  };
}

export function openSnackBar(message: string, severity: 'success' | 'error' | 'warning' | 'info'): SnackbarAction {
  return {
    type: 'SNACKBAR_OPEN',
    payload: {
      message,
      severity,
    },
  };
}

export function clearSnackBar(): SnackbarAction {
  return {
    type: 'SNACKBAR_CLEAR',
  };
}

export default openSnackBar;
