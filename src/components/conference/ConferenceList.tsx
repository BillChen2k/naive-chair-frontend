import React from 'react';
import {
  Button,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {parseConferences} from '@/types/conference.type';
import {Link} from 'react-router-dom';
import useAxios from '@/services/hooks/useAxios';
import endpoints from '@/config/endpoints';
import useAuth from '@/services/hooks/useAuth';
import {useDispatch} from 'react-redux';
import openSnackBar from '@/store/actions/snackbarActions';

type Props = {
  action?: {
    text: string;
    routerPath? : string;
    url?: string;
  }
};

const ConferenceList: React.FC<Props> = (props) => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const {response: conferenceResponse, loading, error} = useAxios(endpoints[auth.userObj.role].getConferenceList);
  if (loading) {
    return <LinearProgress />;
  }
  if (error) {
    dispatch(openSnackBar('Error fetching conference list:' + error, 'error'));
    return <div>Error fetching conference list: {error}</div>;
  }
  const conferences = parseConferences(conferenceResponse.data);
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}}>
        <TableHead>
          <TableRow>
            {['#', 'Full Name', 'Short Name', 'Location', 'Due Date', 'Accept Num', 'Action'].map((one, index) => (
              <TableCell key={index}>{one}</TableCell>
            ))}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {conferences.map((one, index) => (
            <TableRow key={index}>
              <TableCell>{one.conferenceId}</TableCell>
              <TableCell>{one.fullName}</TableCell>
              <TableCell>{one.shortName}</TableCell>
              <TableCell>{one.location}</TableCell>
              <TableCell>{one.dueDate}</TableCell>
              <TableCell>{one.acceptNum}</TableCell>
              <TableCell>
                {props.action && props.action.routerPath &&
                  <Button variant={'outlined'} size={'small'} component={Link}
                    to={props.action.routerPath.replace(':conferenceId', String(one.conferenceId))}>
                    {props.action.text}
                  </Button>
                }
                {props.action && props.action.url &&
                  <Button variant={'outlined'} size={'small'} target={'_blank'} href={props.action.url}>
                    {props.action.text}
                  </Button>
                }
                {!props.action &&
                  props.children
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ConferenceList;
