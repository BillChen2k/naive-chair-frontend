import React from 'react';
import {Box} from '@mui/material';
import useAuth from '@/services/hooks/useAuth';

function MyResearchers() {
  const auth = useAuth();
  return (
    <Box>
      {auth.accessControl(['author'])}
      Paper Author Management.
    </Box>
  );
}

export default MyResearchers;
