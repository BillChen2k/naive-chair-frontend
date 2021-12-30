import React from 'react';
import {Box, Fab, Stack, Typography} from '@mui/material';
import ConferenceList from '@/components/conference/ConferenceList';
import useAuth from '@/services/hooks/useAuth';
import {Link} from 'react-router-dom';
import {Add} from '@mui/icons-material';

function ConferenceManagement() {
  const auth = useAuth();
  if (auth.accessControl(['referee'])) {
    return auth.forbidden403;
  }
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Select Conference to Manage:</Typography>
      <ConferenceList action={{
        text: 'Manage',
        routerPath: '/conferences/edit/:conferenceId',
      }} />
      <Box>
        <Fab sx={{float: 'right'}} color={'secondary'} component={Link} to={'/conferences/create'}>
          <Add />
        </Fab>
        <Typography sx={{float: 'right', m: 2}} variant="body1">Create New Conference: </Typography>
      </Box>
    </Stack>
  );
}

export default ConferenceManagement;
