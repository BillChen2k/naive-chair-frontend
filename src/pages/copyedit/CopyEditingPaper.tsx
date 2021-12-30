import * as React from 'react';
import {useParams} from 'react-router-dom';
import useAxios from '@/services/hooks/useAxios';
import endpoints from '@/config/endpoints';
import useAuth from '@/services/hooks/useAuth';
import {
  Box, Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import openSnackBar from '@/store/actions/snackbarActions';
import {useDispatch} from 'react-redux';
import {IPaper, parsePaperList} from '@/types/paper.type';
import {
  AccountBalanceOutlined,
  AssignmentInd,
  Download,
  Event,
  HistoryEdu,
  Info,
  LocationOn,
} from '@mui/icons-material';
import {downloadPaper} from '@/services/paperService';
import {IResearcher} from '@/types/researcher.type';

type Props = {};

const CopyEditingPaper: React.FC<Props> = (props) => {
  const {paperId} = useParams();
  const auth = useAuth();
  const dispatch = useDispatch();
  if (auth.accessControl(['author', 'referee'])) {
    return auth.forbidden403;
  }
  const {response, loading, error} = useAxios(endpoints[auth.userObj.role].getPaperList);
  if (loading) {
    return <LinearProgress />;
  }
  if (!loading && error) {
    dispatch(openSnackBar(error, 'error'));
    return <Typography variant={'body1'}>{error}</Typography>;
  }
  const papers = parsePaperList(response.data);
  const paper: IPaper = papers.find((p) => p.paperId === Number(paperId));
  console.log(paper);

  return (
    <div>
      <Stack spacing={2}>
        <Grid container>
          <Typography variant={'h2'}>{paper.title}</Typography>
          <Box sx={{flexGrow: 1}}></Box>
          <Button variant={'contained'} sx={{px: 2}} color={'secondary'} onClick={() => {
            dispatch(openSnackBar('Downloading paper...', 'info'));
            downloadPaper(paper.paperId, paper.title, auth.userObj.role).catch((err) => {
              dispatch(openSnackBar(err.message, 'error'));
            });
          }}>
            <Download sx={{mr: 1}}/>
            Access Full Paper
          </Button>
        </Grid>
        <Typography variant={'h4'}>ABSTRACT</Typography>
        <Typography variant={'body1'}>{paper.abstract}</Typography>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant={'body1'}>Authors</Typography>
              </Grid>
              {paper.researcherDetails.map((researcher: IResearcher) => (
                <Grid item xs={4} key={researcher.researcherId}>
                  <ListItem>
                    <ListItemIcon>
                      <AssignmentInd />
                    </ListItemIcon>
                    <ListItemText primary={
                      researcher.name +
                      (paper.paperResearchers.find((r) => r.researcherId === researcher.researcherId).corresponding ? ' (Corresponding)' : '')}
                    secondary={
                      <div>
                        <Typography variant={'body2'}>{researcher.email}</Typography>
                        <Typography variant={'body2'}>{researcher.affiliation}</Typography>
                      </div>
                    } />
                  </ListItem>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant={'body1'}>Review Status</Typography>
          </CardContent>
        </Card>
      </Stack>
    </div>
  );
};

export default CopyEditingPaper;
