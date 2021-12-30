import React from 'react';
import {Box} from '@mui/material';
import useAuth from '@/services/useAuth';
import {UserRole} from '@/types/user.type';

function AuthorManagement() {
  const auth = useAuth();
  return (
    <Box>
      {auth.accessControl(['author' as UserRole])}
      Paper Author Management.
    </Box>
  );
}

export default AuthorManagement;
