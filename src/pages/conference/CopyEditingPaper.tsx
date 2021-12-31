import * as React from 'react';
import {useParams} from 'react-router-dom';
import useAxios from '@/services/hooks/useAxios';
import endpoints from '@/config/endpoints';
import useAuth from '@/services/hooks/useAuth';
import {
  Box, Button,
  Card, CardActions,
  CardContent,
  Grid,
  LinearProgress,
  ListItem, ListItemButton,
  ListItemIcon,
  ListItemText, MenuItem, Select,
  Stack, TextField,
  Typography,
} from '@mui/material';
import openSnackBar from '@/store/actions/snackbarActions';
import {useDispatch} from 'react-redux';
import {IPaper, IPaperStatus, paperStatus2Readable, parsePaperList} from '@/types/paper.type';
import {
  AccountBalanceOutlined,
  AssignmentInd, ChatBubbleOutline,
  Download, Edit,
  Event,
  HistoryEdu,
  Info,
  LocationOn, SportsScore,
} from '@mui/icons-material';
import {downloadPaper} from '@/services/paperService';
import {IResearcher} from '@/types/researcher.type';
import MDEditor from '@uiw/react-md-editor';
import {useState} from 'react';
import {axiosAuthed} from '@/services/axiosAuthed';

type Props = {};

const CopyEditingPaper: React.FC<Props> = (props) => {
  const {paperId} = useParams();
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [paper, setPaper] = useState<IPaper>(undefined);
  const auth = useAuth();
  if (auth.accessControl(['referee'])) {
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
  if (!loading && !error && !paper) {
    // To avoid loop rendering
    const papers = parsePaperList(response.data);
    const paperObj: IPaper = papers.find((p) => p.paperId === Number(paperId));
    setPaper(paperObj);
    console.log(paper);
    return null;
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
          <CardActions>
            {editing &&
              <Button variant={'outlined'} color={'secondary'} fullWidth
                onClick={() => {
                  setEditing(!editing);
                }}>
                Cancel
              </Button>
            }

            <Button fullWidth variant={editing ? 'contained' : 'outlined'} color={'secondary'}
              onClick={() => {
                if (editing) {
                  axiosAuthed(endpoints.referee.changePaperOpinion, {...paper, paperid: paper.paperId})
                      .then((res) => dispatch(openSnackBar('Paper review finished.', 'success')))
                      .catch((err) => dispatch(openSnackBar(err.message, 'error')));
                }
                setEditing(!editing);
              }}>
              <Edit sx={{mr: 1}}/>
              {editing ? 'Save Review' : 'Review Paper'}
            </Button>
          </CardActions>
        </Card>
      </Stack>
    </div>
  );
};

export default CopyEditingPaper;
