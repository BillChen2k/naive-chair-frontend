import React from 'react';
import {LinearProgress, Stack, Typography} from '@mui/material';
import useAuth from '@/services/hooks/useAuth';
import ResearcherList from '@/components/researcher/ResearcherList';
import useAxios from '@/services/hooks/useAxios';
import endpoints from '@/config/endpoints';
import openSnackBar from '@/store/actions/snackbarActions';
import {useDispatch} from 'react-redux';
import {parseResearcher} from '@/types/researcher.type';

function MyResearchers() {
  const auth = useAuth();
  const dispatch = useDispatch();
  if (auth.accessControl(['author'])) {
    return auth.forbidden403;
  };
  const {response, loading, error} = useAxios(endpoints.author.getResearcherList);
  if (loading) {
    return <LinearProgress />;
  }
  if (error) {
    dispatch(openSnackBar('Error fetching conference list:' + error, 'error'));
    return <div>Error: {error}</div>;
  }
  const researchers = response.data.map(parseResearcher);
  return (
    <Stack spacing={2}>
      <Typography variant={'h2'}>My Researchers</Typography>
      <Typography variant={'body1'}>List of researchers related to you.</Typography>
      <ResearcherList researchers={researchers}>

      </ResearcherList>
    </Stack>
  );
}

export default MyResearchers;
