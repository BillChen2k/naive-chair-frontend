import React from 'react';
import {Link, useParams} from 'react-router-dom';
import useAxios from '@/services/useAxios';
import endpoints from '@/config/endpoints';
import useAuth from '@/services/useAuth';
import {Box, Button, Grid, LinearProgress, Stack, Typography} from '@mui/material';
import {parseConferences} from '@/types/conference.type';
import {Edit, Outbox, RateReview} from '@mui/icons-material';
import MDEditor from '@uiw/react-md-editor';
import {useDispatch} from 'react-redux';
import openSnackBar from '@/store/actions/snackbarActions';
import ConferenceMeta from '@/components/conference/ConferenceMeta';

function ConferenceDetail() {
  const {conferenceId} = useParams();
  const auth = useAuth();
  const {response, loading, error} = useAxios(endpoints[auth.userObj.role].getConferenceList);
  if (loading) {
    return <LinearProgress />;
  }
  if (!loading && error) {
    return <div>{error}</div>;
  }

  const conference = parseConferences(response.data).find((c) => c.conferenceId === parseInt(conferenceId));

  return (
    <Box>
      <Stack spacing={1}>
        <Typography variant={'h2'}>{conference.fullName} ({conference.shortName})</Typography>
        <ConferenceMeta conference={conference} />
        <MDEditor.Markdown source={conference.introduction} />
        <Grid container mx={{mt: 2}} spacing={2}>
          <Box sx={{flexGrow: 1}}></Box>
          {auth.userObj.role == 'author' &&
            <Grid item>
              <Button component={Link} variant={'contained'} to={`/paper-submission/${conferenceId}`}>
                <Outbox sx={{mr: 1}}/>
                Submit Paper
              </Button>
            </Grid>
          }
          {auth.userObj.role == 'referee' &&
            <Grid item>
              <Button component={Link} variant={'contained'} to={`/conference-management/edit/${conferenceId}`}>
                <Edit sx={{mr: 1}}/>
                Edit Conference
              </Button>
            </Grid>
          }
          {auth.userObj.role == 'referee' &&
            <Grid item>
              <Button component={Link} variant={'contained'} to={`/copy-editing/conference/${conferenceId}`}>
                <RateReview sx={{mr: 1}}/>
                Copy Editing
              </Button>
            </Grid>
          }
        </Grid>
      </Stack>
    </Box>
  );
}

export default ConferenceDetail;
