import React from 'react';
import {
  Box, Button,
  Divider,
  Grid, IconButton,
  Paper,
  Stack,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {Link, Outlet} from 'react-router-dom';
import useAxios from '@/services/useAxios';
import endpoints from '@/config/endpoints';
import useAuth from '@/services/useAuth';
import IConference from '@/types/conference.type';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {More} from '@mui/icons-material';

function parseConferences(data: any[]) : IConference[] {
  return data.map((one): IConference => {
    return {
      conferenceId: one.conferenceid,
      fullName: one.full_name,
      shortName: one.short_name,
      location: one.location,
      dueDate: one.due_date,
      introduction: one.introduction,
    };
  });
}

function Conferences() {
  const {response: conferenceResponse, loading, error} = useAxios(endpoints.author.getConferenceList);
  return (
    <Stack spacing={2}>
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
