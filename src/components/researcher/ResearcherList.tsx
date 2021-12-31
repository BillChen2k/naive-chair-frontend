import * as React from 'react';
import {
  Button, IconButton,
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
import useAuth from '@/services/hooks/useAuth';
import {useDispatch} from 'react-redux';
import useAxios from '@/services/hooks/useAxios';
import endpoints from '@/config/endpoints';
import openSnackBar from '@/store/actions/snackbarActions';
import {IResearcher} from '@/types/researcher.type';
import {Delete} from '@mui/icons-material';

type Props = {
  researchers: IResearcher[],
  action?: {
    text: string;
    routerPath? : string;
    url?: string;
  },
};

const PaperList: React.FC<Props> = (props) => {
  const auth = useAuth();
  const dispatch = useDispatch();
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}}>
        <TableHead>
          <TableRow>
            {['#', 'Name', 'Email', 'Affiliation', 'Research Interest', 'Action'].map((one, index) => (
              <TableCell key={index}>{one}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.researchers.map((one, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{one.name}</TableCell>
              <TableCell>{one.email}</TableCell>
              <TableCell>{one.affiliation}</TableCell>
              <TableCell>{one.interest}</TableCell>
              <TableCell>
                <IconButton size={'small'}>
                  <Delete />
                </IconButton>
                {/* {props.action && props.action.routerPath && */}
                {/*   <Button variant={'outlined'} size={'small'} component={Link} */}
                {/*           to={props.action.routerPath.replace(':paperId', String(one.paperId))}> */}
                {/*     {props.action.text} */}
                {/*   </Button> */}
                {/* } */}
                {/* {props.action && props.action.url && */}
                {/*   <Button variant={'outlined'} size={'small'} target={'_blank'} href={props.action.url}> */}
                {/*     {props.action.text} */}
                {/*   </Button> */}
                {/* } */}
                {/* {props.page === 'history' && */}
                {/*   <Button variant={'outlined'} size={'small'} component={Link} */}
                {/*           to={'/paper/' + one.paperId}> */}
                {/*     View Details */}
                {/*   </Button> */}
                {/* } */}
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
