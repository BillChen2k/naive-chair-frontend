import {SnackbarAction} from '@/store/actions/snackbarActions';
import {AnyAction} from '@reduxjs/toolkit';

type IUIReducerAction = SnackbarAction | AnyAction;

interface IUIReducerState {
  snackbar: {
    open: boolean;
    message: string;
    severity: 'info' | 'success' | 'warning' | 'error';
  };
}

const initState: IUIReducerState = {
  snackbar: {
    open: false,
    message: '',
    severity: 'info',
  },
};

const uiReducer = (state = initState, action: IUIReducerAction) => {
  switch (action.type) {
    case 'SNACKBAR_OPEN':
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.payload.message,
          severity: action.payload.severity,
        },
      };
    case 'SNACKBAR_CLEAR':
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          open: false,
        },
      };
    default:
      return state;
  }
};

export default uiReducer;
