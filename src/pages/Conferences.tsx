import React from 'react';
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {Link, Outlet} from 'react-router-dom';
import useAxios from '@/services/useAxios';
import endpoints from '@/config/endpoints';
import IConference, {parseConferences} from '@/types/conference.type';
import useAuth from '@/services/useAuth';

function Conferences() {
  const auth = useAuth();
  if (auth.accessControl(['author', 'referee'])) {
    return auth['forbidden403'];
  };

  const {response: conferenceResponse, loading, error} = useAxios(endpoints[auth.userObj.role].getConferenceList);

  return (
    <Stack spacing={2}>
      {/* Alternative way to do access control. */}
      {auth.accessControl(['author', 'referee'])}
      <Typography variant="h4">Conferences</Typography>
      {loading && <Typography>Loading...</Typography>}
      {!loading && !error &&
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}}>
            <TableHead>
              <TableRow>
                {['#', 'Full Name', 'Short Name', 'Location', 'Due Date', 'Details'].map((one, index) => (
                  <TableCell key={index}>{one}</TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parseConferences(conferenceResponse.data).map((one, index) => (
                <TableRow key={index}>
                  <TableCell>{one.conferenceId}</TableCell>
                  <TableCell>{one.fullName}</TableCell>
                  <TableCell>{one.shortName}</TableCell>
                  <TableCell>{one.location}</TableCell>
                  <TableCell>{one.dueDate}</TableCell>
                  <TableCell>
                    <Button variant={'outlined'} size={'small'} component={Link} to={`/conferences/${one.conferenceId}`}>
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
      <Outlet/>
    </Stack>
  );
}

export default Conferences;
