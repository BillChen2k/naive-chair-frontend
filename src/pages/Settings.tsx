import React from 'react';
import {Box, Button, Grid, Stack, TextField, Typography} from '@mui/material';
import ConferenceMeta from '@/components/conference/ConferenceMeta';
import MDEditor from '@uiw/react-md-editor';
import {Link} from 'react-router-dom';
import {Edit, Lock, Outbox, RateReview} from '@mui/icons-material';
import useAuth from '@/services/hooks/useAuth';

function Settings() {
  const auth = useAuth();
  if (auth.accessControl(['author', 'referee'])) {
    return auth.forbidden403;
  }
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={8} md={6}>
          <Stack spacing={2}>
            <Typography variant={'h2'}>Settings</Typography>
            <Typography variant={'h6'}>Password Settings</Typography>
            <TextField
              label={'Current Password'}
              type={'password'}
              fullWidth
              margin={'normal'} />
            <TextField
              label={'New Password'}
              type={'password'}
              fullWidth
              margin={'normal'} />
            <TextField
              label={'Repeat New Password'}
              type={'password'}
              fullWidth
              margin={'normal'} />
            <Button
              variant={'contained'}
              color={'primary'}
              startIcon={<Lock />}
              fullWidth>
              Change Password
            </Button>
            <Typography variant={'h6'}>Profile Settings</Typography>
            <Typography variant={'body1'}>Edit your profile at the profile page:</Typography>
            <Button component={Link}
              variant={'contained'}
              startIcon={<Edit />}
              to={`/profile/${auth.userObj.username}?edit`}>
              Edit Profile
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Settings;
