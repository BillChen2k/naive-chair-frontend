import React from 'react';
import {useParams} from 'react-router-dom';
import useAxios from '@/services/useAxios';
import endpoints from '@/config/endpoints';
import useAuth from '@/services/useAuth';
import {Box, Stack, Typography} from '@mui/material';
import IConference, {parseConferences} from '@/types/conference.type';

function ConferenceDetail() {
  const {conferenceId} = useParams();
  const auth = useAuth();
  const {response, loading, error} = useAxios(endpoints[auth.userObj.role].getConferenceList);
  let conference: IConference;
  if (!loading) {
    conference = parseConferences(response.data).find((c) => c.conferenceId === parseInt(conferenceId));
  }

  return (
    <Box>
      {!loading && !error && (
        <Stack spacing={1}>
          <Typography variant={'caption'}>Conference introduction for {conferenceId}:</Typography>
          <Typography variant={'body1'}>{conference.introduction}</Typography>
        </Stack>
      )}
    </Box>
  );
}

export default ConferenceDetail;
