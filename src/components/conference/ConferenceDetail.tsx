import React from 'react';
import {useParams} from 'react-router-dom';

function ConferenceDetail() {
  let {conferenceId} = useParams();
  return (
    <div>Conference details for {conferenceId}</div>
  );
}

export default ConferenceDetail;
