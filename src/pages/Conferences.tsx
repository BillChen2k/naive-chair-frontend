import React from 'react';
import {Box, Divider, Stack, Typography} from '@mui/material';
import {Outlet} from 'react-router-dom';
import useAxios from '@/services/useAxios';
import endpoints from '@/config/endpoints';

function Conferences() {
  const {response, loading} = useAxios(endpoints.referee.getConferenceList);
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Conferences</Typography>
      <Outlet/>
    </Stack>
  );
}

export default Conferences;
