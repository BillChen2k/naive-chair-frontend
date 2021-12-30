import * as React from 'react';
import {useState} from 'react';
import {Navigate} from 'react-router-dom';
import useAuth from '@/services/hooks/useAuth';
import {useDispatch} from 'react-redux';
import IConference, {parseServerConference} from '@/types/conference.type';
import endpoints from '@/config/endpoints';
import {Box, Button, Grid, ListItem, ListItemIcon, ListItemText, Stack, TextField, Typography} from '@mui/material';
import {axiosAuthed} from '@/services/axiosAuthed';
import openSnackBar from '@/store/actions/snackbarActions';
import TextBadge from '@/components/TextBadge';
import {Add, Event, Groups, Info} from '@mui/icons-material';
import MDEditor from '@uiw/react-md-editor';

type Props = {};

const ConferenceCreation: React.FC<Props> = (props) => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const [conference, setConference] = React.useState<IConference>({
    fullName: 'Your New Conference',
    shortName: 'YNC',
    introduction: 'This is the description of your conference',
    dueDate: (new Date()).toLocaleDateString(),
    acceptNum: 1000,
    location: 'East China Normal University',
  });

  const [created, setCreated] = useState<boolean>(false);
  if (auth.accessControl(['referee'])) {
    return auth.forbidden403;
  }
  if (created) {
    return <Navigate to={`/conferences`} />;
  }

  function handleCreate() {
    axiosAuthed(endpoints.referee.createConference, {...parseServerConference(conference)})
        .then(() => {
          setCreated(true);
          dispatch(openSnackBar('Conference created.', 'success'));
        // window.location.reload();
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
          <Box sx={{flexGrow: 1}}></Box>
          <Button variant={'contained'} startIcon={<Add />} sx={{px: 3}}
            onClick={() => handleCreate()}>
            Create Conference
          </Button>
        </Grid>
      </Stack>
    </Box>
  );
};

export default ConferenceCreation;
