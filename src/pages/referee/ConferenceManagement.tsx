import React from 'react';
import {Box, Stack, Typography} from '@mui/material';
import ConferenceList from '@/components/conference/ConferenceList';

function ConferenceManagement() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Conference Management</Typography>
      <ConferenceList action={{
        text: 'Edit',
        routerPath: '/conference-management/:conferenceId',
      }} />
    </Stack>
  );
}

export default ConferenceManagement;
