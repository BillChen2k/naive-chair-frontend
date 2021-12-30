import Dashboard from '@/components/dashboard';
import {Route, Routes} from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Logout from '@/pages/Logout';
import Profile from '@/pages/Profile';
import Forbidden403 from '@/pages/misc/Forbidden403';
import * as React from 'react';
import AuthorManagement from '@/pages/author/AuthorManagement';
import PaperSubmission from '@/pages/author/PaperSubmission';
import SubmissionHistory from '@/pages/author/SubmissionHistory';
import ConferenceManagement from '@/pages/referee/ConferenceManagement';
import CopyEditing from '@/pages/copyedit/CopyEditing';
import Conferences from '@/pages/Conferences';
import ConferenceDetail from '@/components/conference/ConferenceDetail';
import Settings from '@/pages/Settings';
import CopyEditingConference from '@/pages/copyedit/CopyEditingConference';

export default function AppRoute() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />}>
        <Route index element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/logout' element={<Logout />}/>
        <Route path='/profile/:username' element={<Profile />}/>
        <Route path='/conferences' element={<Conferences />}></Route>
        <Route path='/conferences/:conferenceId' element={<ConferenceDetail />}/>
        <Route path='/settings' element={<Settings />} />
        {/* Authors */}
        <Route path='/author-management' element={<AuthorManagement />}/>
        <Route path='/paper-submission' element={<PaperSubmission />}/>
        <Route path='/submission-history' element={<SubmissionHistory />}/>
        {/* Referees */}
        <Route path='/conference-management' element={<ConferenceManagement />}/>
        <Route path='/copy-editing' element={<CopyEditing />}/>
        <Route path='/copy-editing/conference/:conferenceId' element={<CopyEditingConference />}/>
        {/* Misc */}
        <Route path='/403' element={<Forbidden403 />} />
      </Route>
    </Routes>
  );
}
