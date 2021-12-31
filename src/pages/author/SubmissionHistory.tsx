import React from 'react';
import {Box, Button, LinearProgress, Stack, Typography} from '@mui/material';
import useAuth from '@/services/hooks/useAuth';
import useAxios from '@/services/hooks/useAxios';
import endpoints from '@/config/endpoints';
import openSnackBar from '@/store/actions/snackbarActions';
import {useDispatch} from 'react-redux';
import {parsePaperList} from '@/types/paper.type';
import PaperList from '@/components/paper/PaperList';

function SubmissionHistory() {
  const auth = useAuth();
  const dispatch = useDispatch();
  if (auth.accessControl(['author'])) {
    return auth.forbidden403;
  };
  const {response, loading, error} = useAxios(endpoints.author.getPaperList);
  if (loading) {
    return <LinearProgress />;
  }
  if (!loading && error) {
    dispatch(openSnackBar(error, 'error'));
    return <Typography variant={'body1'}>{error}</Typography>;
  }
  const papers = parsePaperList(response.data);
  console.log(papers);
  return (
    <Stack spacing={2}>
      <Typography variant={'h2'}>Submission History</Typography>
      <PaperList papers={papers} page={'history'} />
    </Stack>
  );
}

export default SubmissionHistory;
