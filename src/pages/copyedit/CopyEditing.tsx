import React from 'react';
import {Box, Stack, Typography} from '@mui/material';
import ConferenceList from '@/components/conference/ConferenceList';

function CopyEditing() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Select Conference to Copy Edit</Typography>
      <ConferenceList action={{
        text: 'Copy Edit',
        routerPath: '/copy-editing/conference/:conferenceId',
      }} />
    </Stack>
  );
}

export default CopyEditing;
