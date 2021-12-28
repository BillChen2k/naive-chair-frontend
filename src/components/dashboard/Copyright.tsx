import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {red} from '@mui/material/colors';
import {Box, IconButton} from '@mui/material';
import {GitHub} from '@mui/icons-material';

export default function Copyright(props: any) {
  return (
    <Box {...props}>
      <Typography variant='body2' color={'text.secondary'} align='center'>
        {'Copyright © '}
        {new Date().getFullYear()}
        {' '}
        <Link color={red[800]} href='https://www.ecnu.edu.cn/'>
          East China Normal University
        </Link>
      </Typography>
      <Typography variant={'body2'} color={'text.secondary'} align='center'>
        <IconButton onClick={() => window.open('https://github.com/billchen2k/naivechair-frontend')}>
          <GitHub sx={{width: '20px'}} />
        </IconButton>
      </Typography>
    </Box>

  );
}
