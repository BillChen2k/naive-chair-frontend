import * as React from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {IPaper, IPaperStatus, paperStatus2Readable, parsePaperList} from '@/types/paper.type';
import useAuth from '@/services/hooks/useAuth';
import useAxios from '@/services/hooks/useAxios';
import endpoints from '@/config/endpoints';
import {
  Box,
  Button,
  Card, CardActions,
  CardContent,
  Grid,
  LinearProgress,
  ListItem,
  ListItemButton, ListItemIcon, ListItemText, MenuItem, Select,
  Stack, TextField,
  Typography,
} from '@mui/material';
import openSnackBar from '@/store/actions/snackbarActions';
import {downloadPaper} from '@/services/paperService';
import {AssignmentInd, ChatBubbleOutline, Check, Delete, Download, Edit, Info, SportsScore} from '@mui/icons-material';
import {IResearcher} from '@/types/researcher.type';
import MDEditor from '@uiw/react-md-editor';
import {axiosAuthed} from '@/services/axiosAuthed';
import {Navigate} from 'react-router-dom';

type Props = {};

const PaperDetails: React.FC<Props> = (props) => {
  const {paperId} = useParams();
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [paper, setPaper] = useState<IPaper>(undefined);
  const [deleted, setDeleted] = useState(false);
  const auth = useAuth();

  const {response, loading, error} = useAxios(endpoints[auth.userObj.role].getPaperList);
  if (loading) {
    return <LinearProgress />;
  }
  if (!loading && error) {
    dispatch(openSnackBar(error, 'error'));
    return <Typography variant={'body1'}>{error}</Typography>;
  }
  if (!loading && !error && !paper) {
    // To avoid loop rendering
    const papers = parsePaperList(response.data);
    const paperObj: IPaper = papers.find((p) => p.paperId === Number(paperId));
    if (!paperObj) {
      return auth.forbidden403;
    }
    setPaper(paperObj);
    console.log(paper);
    return null;
  }

  if (deleted) {
    return <Navigate to={'/submission-history'} />;
  }

  function handleDelete() {
    axiosAuthed(endpoints.author.removePaper, {paperid: paperId})
        .then(() => {
          setDeleted(true);
          dispatch(openSnackBar('Submisison withdrawed.', 'success'));
        })
        .catch((err) => dispatch(openSnackBar(err.message, 'error')));
  }

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
                <Typography variant={'h6'}>Authors</Typography>
              </Grid>
              {paper.researcherDetails.map((researcher: IResearcher) => (
                <Grid item xs={12} md={4} key={researcher.researcherId}>
                  <ListItem>
                    <ListItemButton onClick={() => {
                      navigator.clipboard.writeText(researcher.email);
                      dispatch(openSnackBar('Email copied to clipboard.', 'info'));
                    }}>
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
                    </ListItemButton>

                  </ListItem>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Review Status */}
        <Card>
          <CardContent>
            <Typography variant={'h6'}>Review Status</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ListItem>
                  <ListItemIcon>
                    <ChatBubbleOutline />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant={'caption'} color={'gray'} >Opinions:</Typography>
                    {
                      editing ?
                        <MDEditor
                          value={paper.opinion}
                          onChange={(value) => {
                            setPaper({...paper, opinion: value});
                          }}
                        /> :
                        <MDEditor.Markdown source={paper.opinion} />
                    }

                  </ListItemText>
                </ListItem>
              </Grid>
              {[
                {
                  icon: <Info />,
                  title: 'Review Status',
                  value: paperStatus2Readable(paper.status),
                  editor: (
                    <Select
                      fullWidth
                      value={paper.status}
                      size={'small'}
                      onChange={(e) => {
                        setPaper({...paper, 'status': e.target.value as IPaperStatus});
                      }}
                    >
                      {['not reviewed', 'reviewed', 'accepted', 'rejected'].map((status: IPaperStatus) =>
                        (<MenuItem key={status} value={status}>{paperStatus2Readable(status)}</MenuItem>),
                      )}
                    </Select>
                  ),
                },
                {
                  icon: <SportsScore />,
                  size: 'small',
                  title: 'Review Score',
                  value: paper.score,
                  field: 'score',
                  editor: (
                    <TextField
                      value={paper.score}
                      onChange={(e) => {
                        setPaper({...paper, score: Number(e.target.value)});
                      }}
                      size={'small'} fullWidth
                      type={'number'}
                      inputProps={{
                        min: 0,
                        max: 100,
                        step: 1,
                      }}
                    />
                  ),
                },
              ].map((item) => (
                <Grid item xs={12} md={4} key={item.title}>
                  <ListItem>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={
                      editing ? item.editor : item.value
                    } secondary={item.title} />
                  </ListItem>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
        {auth.userObj.role == 'author' &&
          <Grid container mx={{mt: 2}} spacing={2}>
            <Button variant={'contained'} color={'error'} onClick={handleDelete} startIcon={<Delete />}>
              Withdraw Submission
            </Button>
            <Box sx={{flexGrow: 1}}></Box>
            {/* <Button variant={'contained'} */}
            {/*         startIcon={<Check />} */}
            {/*         sx={{px: 3}} */}
            {/*         onClick={() => handleSave()}> */}
            {/*   Save Conference */}
            {/* </Button> */}
          </Grid>
        }
      </Stack>
    </div>
  );
};

export default PaperDetails;
