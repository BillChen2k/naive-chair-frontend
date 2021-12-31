import Dashboard from '@/components/dashboard';
import {Route, Routes} from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Logout from '@/pages/Logout';
import Profile from '@/pages/Profile';
import Forbidden403 from '@/pages/misc/Forbidden403';
import * as React from 'react';
import MyResearchers from '@/pages/author/My Researchers';
import PaperSubmission from '@/pages/author/PaperSubmission';
import SubmissionHistory from '@/pages/author/SubmissionHistory';
import ConferenceManagement from '@/pages/conference/ConferenceManagement';
import CopyEditing from '@/pages/conference/CopyEditing';
import Conferences from '@/pages/Conferences';
import ConferenceDetail from '@/pages/ConferenceDetail';
import Settings from '@/pages/Settings';
import CopyEditingConference from '@/pages/conference/CopyEditingConference';
import CopyEditingPaper from '@/pages/conference/CopyEditingPaper';
import ConferenceEdit from '@/pages/conference/ConferenceEdit';
import PaperDetails from '@/pages/author/PaperDetails';
import ConferenceCreation from '@/pages/conference/ConferenceCreation';
import PaperSubmitConference from '@/pages/author/PaperSubmitConference';

export default function AppRoute() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />}>
        <Route index element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/logout' element={<Logout />}/>
        <Route path='/settings' element={<Settings />} />
        <Route path='/profile/:username' element={<Profile />}/>

        <Route path='/conferences' element={<Conferences />}></Route>
        <Route path='/conferences/:conferenceId' element={<ConferenceDetail />}/>
        {/* Authors */}
        <Route path='/researcher' element={<MyResearchers />}/>
        <Route path='/paper-submission' element={<PaperSubmission />}/>
        <Route path='/submission-history' element={<SubmissionHistory />}/>
        {/* Referees */}
        <Route path='/conference-management' element={<ConferenceManagement />}/>
        <Route path='/conferences/edit/:conferenceId' element={<ConferenceEdit />}/>
        <Route path='/conferences/create' element={<ConferenceCreation />}/>

        <Route path='/copy-editing' element={<CopyEditing />}/>
        <Route path='/copy-editing/conference/:conferenceId' element={<CopyEditingConference />}/>

        <Route path='/paper/copy-edit/:paperId' element={<CopyEditingPaper />}/>
        <Route path='/paper/submit/:conferenceId' element={<PaperSubmitConference />}/>
        <Route path='/paper/:paperId' element={<PaperDetails />}/>
        {/* Misc */}
        <Route path='/403' element={<Forbidden403 />} />
      </Route>
    </Routes>
  );
}
