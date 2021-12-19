import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {red} from '@mui/material/colors';

export default function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color={red[800]} href="https://www.ecnu.edu.cn/">
                East China Normal University
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
