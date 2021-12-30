import React from 'react';
import IConference from '@/types/conference.type';
import {Event, Info, LocationOn} from '@mui/icons-material';
import {Grid, ListItem, ListItemIcon, ListItemText} from '@mui/material';

function ConferenceMeta(props: {
  conference: IConference
}) {
  const conference = props.conference;
  const status = new Date(conference.dueDate) > new Date() ? 'Open for Submission' : 'Already Finished';
  return (
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
  );
}

export default ConferenceMeta;
