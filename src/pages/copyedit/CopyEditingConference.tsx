import * as React from 'react';
import {Box, LinearProgress, Typography} from '@mui/material';
import {useParams} from 'react-router-dom';
import ConferenceMeta from '@/components/conference/ConferenceMeta';
import useAuth from '@/services/useAuth';
import {useDispatch} from 'react-redux';
import useAxios from '@/services/useAxios';
import endpoints from '@/config/endpoints';
import IConference, {parseConferences} from '@/types/conference.type';
import {parsePapers} from '@/types/paper.type';
import PaperList from '@/components/paper/PaperList';

type Props = {};

const CopyEditingConference: React.FC<Props> = () => {

  const {conferenceId} = useParams();
  const auth = useAuth();
  const dispatch = useDispatch();
  const callConferenceList = useAxios(endpoints[auth.userObj.role].getConferenceList);
  const callPaperList= useAxios(endpoints.referee.getPaperList);
  if (callConferenceList.loading || callPaperList.loading) {
    return <LinearProgress />;
  }
  if (callConferenceList.error || callPaperList.error) {
    return <Box>Error</Box>;
  }
  const conference: IConference = parseConferences(callConferenceList.response.data).find((c) => c.conferenceId === parseInt(conferenceId));
  let papers = parsePapers(callPaperList.response.data);
  console.log(papers);
  papers = papers.filter((p) => p.conferenceId === parseInt(conferenceId));
  console.log(papers);
  // dispatch(setAppTitle(`Copy Edit Conference: ${conference.shortName}`));

  return (
    <Box>
      <Typography variant="h4">Copy Editing: {conference.shortName}</Typography>
      <ConferenceMeta conference={conference} />
      <PaperList papers={papers} action={{text: 'url', routerPath: `/paper/copy-edit/:paperId`}} />
    </Box>
  );
};

export default CopyEditingConference;
