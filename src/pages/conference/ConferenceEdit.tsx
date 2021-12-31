import * as React from 'react';
import {useState} from 'react';
import useAuth from '@/services/hooks/useAuth';
import {Navigate, useParams} from 'react-router-dom';
import useAxios from '@/services/hooks/useAxios';
import endpoints from '@/config/endpoints';
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import IConference, {parseConferences, parseServerConference} from '@/types/conference.type';
import MDEditor from '@uiw/react-md-editor';
import {Check, Delete, Event, Groups, Info} from '@mui/icons-material';
import TextBadge from '@/components/TextBadge';
import {axiosAuthed} from '@/services/axiosAuthed';
import {useDispatch} from 'react-redux';
import openSnackBar from '@/store/actions/snackbarActions';

type Props = {};

const ConferenceEdit: React.FC<Props> = (props) => {
  const {conferenceId} = useParams();
  const auth = useAuth();
  const dispatch = useDispatch();
  const [conference, setConference] = React.useState<IConference>();
  const [saved, setSaved] = useState<boolean>(false);
  const [deleted, setDeleted] = useState(false);
  if (auth.accessControl(['referee'])) {
    return auth.forbidden403;
  }
  const {response, loading, error} = useAxios(endpoints[auth.userObj.role].getConferenceList);
  if (loading) {
    return <LinearProgress />;
  }
  if (!loading && error) {
    return <div>{error}</div>;
  }
  if (!loading && !error && !conference) {
    setConference(parseConferences(response.data).find((c) => c.conferenceId === parseInt(conferenceId)));
    return null;
  }
  if (saved) {
    return <Navigate to={`/conferences/${conferenceId}`} />;
  }
  if (deleted) {
    return <Navigate to={`/conferences`} />;
  }

  function handleSave() {
    axiosAuthed(endpoints.referee.changeConferenceInfo, {...parseServerConference(conference)})
        .then(() => {
          setSaved(true);
          dispatch(openSnackBar('Conference information updated.', 'success'));
        // window.location.reload();
        })
        .catch((err) => dispatch(openSnackBar(err.message, 'error')));
  }

  function handleDelete() {
    axiosAuthed(endpoints.referee.removeConference, {conferenceid: conference.conferenceId})
        .then(() => {
          setDeleted(true);
          dispatch(openSnackBar('Conference removed.', 'success'));
        })
        .catch((err) => dispatch(openSnackBar(err.message, 'error')));
  }

  return (
    <Box>
      <Stack spacing={1}>
        <Stack direction={'row'}>
          <Typography variant={'h2'}>{conference.fullName} ({conference.shortName})</Typography>
          <TextBadge text={'Editing'} />
        </Stack>
        <Grid container>
          {[
            {
              icon: <Groups />,
              text: 'Full Name',
              value: conference.fullName,
              field: 'fullName',
            },
            {
              icon: <Groups />,
              text: 'Short Name',
              value: conference.shortName,
              field: 'shortName',
            },
            {
              icon: <Event />,
              text: 'Due Date',
              value: conference.dueDate,
              field: 'dueDate',
            },
            {
              icon: <Info />,
              text: 'Accepting Papers',
              value: conference.acceptNum,
              field: 'acceptNum',
            },
          ].map(({icon, text, value, field}, index) => (
            <Grid key={index} item xs={12} md={4}>
              <ListItem key={index}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={
                  <TextField
                    fullWidth
                    label={text}
                    value={value}
                    size={'small'}
                    onChange={(e) => setConference({...conference, [field]: e.target.value})}
                    variant={'outlined'}/>
                }
                secondary={text} />
              </ListItem>
            </Grid>
          ))}
        </Grid>
        <MDEditor value={conference.introduction}
          onChange={(val) => setConference({...conference, introduction: val})}
          height={400}
        />
        <Grid container mx={{mt: 2}} spacing={2}>
          <Button variant={'contained'} color={'error'} onClick={handleDelete} startIcon={<Delete />}>
            Delete
          </Button>
          <Box sx={{flexGrow: 1}}></Box>
          <Button variant={'contained'}
            startIcon={<Check />}
            sx={{px: 3}}
            onClick={() => handleSave()}>
            Save Conference
          </Button>
        </Grid>
      </Stack>
    </Box>
  );
};

export default ConferenceEdit;
