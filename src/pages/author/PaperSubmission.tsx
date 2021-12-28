import React from 'react';
import {Box} from '@mui/material';
import useAuth from '@/services/useAuth';

function PaperSubmission() {
  const auth = useAuth();
  return (
    <Box>
      {auth.accessControl(['author'])}
      Paper Submission.
    </Box>
  );
}

export default PaperSubmission;
