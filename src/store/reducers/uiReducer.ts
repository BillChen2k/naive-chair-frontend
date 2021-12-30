import {SnackbarAction} from '@/store/actions/snackbarActions';
import {AnyAction} from '@reduxjs/toolkit';
import {SetTitleAction} from '@/store/actions/uiActions';

type IUIReducerAction = SnackbarAction | SetTitleAction | AnyAction;

interface IUIReducerState {
  snackbar: {
    open: boolean;
    message: string;
    severity: 'info' | 'success' | 'warning' | 'error';
    hash: string;
  };
  title: string;
}

const initState: IUIReducerState = {
  snackbar: {
    open: false,
    message: '',
    severity: 'info',
    hash: '',
  },
  title: 'NaiveChair',
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
          hash: action.payload.hash,
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
    case 'SET_TITLE':
      return {
        ...state,
        title: action.payload,
      };
    default:
      return state;
  }
};

export default uiReducer;
