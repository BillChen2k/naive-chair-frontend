import React from 'react';
import {Box} from '@mui/material';
import useAuth from '@/services/useAuth';

function AuthorManagement() {
  const auth = useAuth();
  return (
    <Box>
      {auth.accessControl(['author'])}
      Paper Author Management.
    </Box>
  );
}

export default AuthorManagement;
