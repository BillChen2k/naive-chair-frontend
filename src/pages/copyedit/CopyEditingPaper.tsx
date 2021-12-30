import * as React from 'react';
import {useParams} from 'react-router-dom';
import useAxios from '@/services/useAxios';
import endpoints from '@/config/endpoints';
import useAuth from '@/services/useAuth';
import {LinearProgress, Typography} from '@mui/material';
import openSnackBar from '@/store/actions/snackbarActions';
import {useDispatch} from 'react-redux';

type Props = {};

const CopyEditingPaper: React.FC<Props> = (props) => {
  const {paperId} = useParams();
  const auth = useAuth();
  const dispatch = useDispatch();
  if (auth.accessControl(['author', 'referee'])) {
    return auth.forbidden403;
  }
  const {response, loading, error} = useAxios(endpoints[auth.userObj.role].getPaperList);
  if (loading) {
    return <LinearProgress />;
  }
  if (!loading && error) {
    dispatch(openSnackBar(error, 'error'));
    return <Typography variant={'body1'}>{error}</Typography>;
  }
  return (
    <div>
      CopyEditPaper
    </div>
  );
};

export default CopyEditingPaper;
