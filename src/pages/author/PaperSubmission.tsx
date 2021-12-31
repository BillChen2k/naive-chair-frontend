import * as React from 'react';
import {Box, Stack, Typography} from '@mui/material';
import useAuth from '@/services/hooks/useAuth';
import ConferenceList from '@/components/conference/ConferenceList';

type Props = {};

const PaperSubmission: React.FC<Props> = (props) => {

  const auth = useAuth();
  if (auth.accessControl(['author', 'referee'])) {
    return auth.forbidden403;
  };
  return (
    <Stack spacing={2}>
      <Typography variant={'h4'}>Select conference to submit your paper</Typography>
      <ConferenceList action={{
        text: 'New Submission',
        routerPath: `/paper/submit/:conferenceId`,
      }}></ConferenceList>
    </Stack>
  );
};

export default PaperSubmission;
