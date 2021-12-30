import * as React from 'react';
import {Box, Typography} from '@mui/material';
import {blue} from '@mui/material/colors';

type Props = {
  text: string;
  color?: string;
};

const TextBadge: React.FC<Props> = (props) => {
  return (
    <Box>
      <Box sx={{
        userSelect: 'none',
        borderRadius: 1,
        backgroundColor: props.color || blue[700],
        color: '#FFFFFF',
        textAlign: 'center',
        height: '1.5rem',
        verticalAlign: 'middle',
        px: '0.5rem',
        ml: '0.5rem',
      }}>
        <Typography sx={{
          lineHeight: '1.5rem',
          fontSize: '0.75rem',
          textAlign: 'center',
          verticalAlign: 'middle',
        }}>{props.text}</Typography>
      </Box>
    </Box>
  );
};

export default TextBadge;
