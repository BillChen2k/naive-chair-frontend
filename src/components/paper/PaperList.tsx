import * as React from 'react';
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
import {Link} from 'react-router-dom';
import {IPaper} from '@/types/paper.type';
import useAuth from '@/services/useAuth';
import {useDispatch} from 'react-redux';
import useAxios from '@/services/useAxios';
import endpoints from '@/config/endpoints';
import openSnackBar from '@/store/actions/snackbarActions';

type Props = {
  papers: IPaper[],
  action?: {
    text: string;
    routerPath? : string;
    url?: string;
  }
};

const PaperList: React.FC<Props> = (props) => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const {response: conferenceResponse, loading, error} = useAxios(endpoints[auth.userObj.role].getConferenceList);
  if (loading) {
    return <LinearProgress />;
  }
  if (error) {
    dispatch(openSnackBar('Error fetching conference list:' + error, 'error'));
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}}>
        <TableHead>
          <TableRow>
            {['#', 'Title', 'Authors', 'Conference', 'Status', 'Review Score', 'Action'].map((one, index) => (
              <TableCell key={index}>{one}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.papers.map((one, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{one.title}</TableCell>
              <TableCell>{one.researcherDetails.map((one) => one.name).join(', ')}</TableCell>
              <TableCell>{one.conferenceDetail.shortName}</TableCell>
              <TableCell>{one.status}</TableCell>
              <TableCell>{one.score}</TableCell>
              <TableCell>
                {props.action && props.action.routerPath &&
                  <Button variant={'outlined'} size={'small'} component={Link}
                    to={props.action.routerPath.replace(':paperId', String(one.paperId))}>
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

export default PaperList;
