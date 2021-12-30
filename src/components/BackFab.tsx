import React from 'react';
import {Fab} from '@mui/material';
import {Link} from 'react-router-dom';
import {ArrowBack} from '@mui/icons-material';

function BackFab(props: {to?: string}) {
  return (
    <Fab color={'secondary'} component={Link} to={props.to}>
      <ArrowBack />
    </Fab>
  );
}

export default BackFab;
