import * as React from 'react';
import {Box, LinearProgress, Stack, Typography} from '@mui/material';
import {useParams} from 'react-router-dom';
import ConferenceMeta from '@/components/conference/ConferenceMeta';
import useAuth from '@/services/hooks/useAuth';
import {useDispatch} from 'react-redux';
import useAxios from '@/services/hooks/useAxios';
import endpoints from '@/config/endpoints';
import IConference, {parseConferences} from '@/types/conference.type';
import {parsePaperList} from '@/types/paper.type';
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
  let papers = parsePaperList(callPaperList.response.data);
  console.log(papers);
  papers = papers.filter((p) => p.conferenceId === parseInt(conferenceId));
  console.log(papers);
  // dispatch(setAppTitle(`Copy Edit Conference: ${conference.shortName}`));

  return (
    <Stack spacing={2}>
      <Typography variant="h4">{conference.shortName}</Typography>
      <ConferenceMeta conference={conference} />
      <Typography variant="h6">Paper List</Typography>
      <PaperList papers={papers} action={{text: 'Review Now', routerPath: `/paper/copy-edit/:paperId`}} />
    </Stack>
  );
};

export default CopyEditingConference;
