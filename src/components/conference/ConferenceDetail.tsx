import React from 'react';
import {Link, useParams} from 'react-router-dom';
import useAxios from '@/services/useAxios';
import endpoints from '@/config/endpoints';
import useAuth from '@/services/useAuth';
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import IConference, {parseConferences} from '@/types/conference.type';
import {Apartment, Edit, Event, Info, LocationOn, Mail, MenuBook, Outbox, RateReview, Web} from '@mui/icons-material';
import MDEditor from '@uiw/react-md-editor';
import {useDispatch} from 'react-redux';
import openSnackBar from '@/store/actions/snackbarActions';

function ConferenceDetail() {
  const {conferenceId} = useParams();
  const auth = useAuth();
  const dispatch = useDispatch();
  const {response, loading, error} = useAxios(endpoints[auth.userObj.role].getConferenceList);
  if (loading) {
    return <LinearProgress />;
  }
  if (!loading && error) {
    dispatch(openSnackBar(error, 'error'));
    return <div>{error}</div>;
  }

  const conference = parseConferences(response.data).find((c) => c.conferenceId === parseInt(conferenceId));
  const status = new Date(conference.dueDate) > new Date() ? 'Open for Submission' : 'Already Finished';

  return (<Stack spacing={1}>
    <Typography variant={'h2'}>{conference.fullName} ({conference.shortName})</Typography>
    <Grid container>
      {[
        {
          icon: <LocationOn />,
          text: 'location',
          value: conference.location,
        },
        {
          icon: <Event />,
          text: 'Due Date',
          value: conference.dueDate,
        },
        {
          icon: <Info />,
          text: 'Status',
          value: status,
        },
      ].map(({icon, text, value}, index) => (
        <Grid key={index} item xs={12} md={4}>
          <ListItem key={index}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={value} secondary={text} />
          </ListItem>
        </Grid>
      ))}
    </Grid>
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
          <Button component={Link} variant={'contained'} to={`/copy-editing/${conferenceId}`}>
            <Edit sx={{mr: 1}}/>
            Edit Conference
          </Button>
        </Grid>
      }
      {auth.userObj.role == 'referee' &&
        <Grid item>
          <Button component={Link} variant={'contained'} to={`/conference-management/${conferenceId}`}>
            <RateReview sx={{mr: 1}}/>
            Copy Editing
          </Button>
        </Grid>
      }
    </Grid>
  </Stack>
  );
}

export default ConferenceDetail;
