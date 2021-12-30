import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  ListItem, ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack, TextField,
  Typography,
} from '@mui/material';
import useAuth from '@/services/useAuth';
import {blue} from '@mui/material/colors';
import {Apartment, Edit, Mail, MenuBook, Web} from '@mui/icons-material';
import useAxios from '@/services/useAxios';
import endpoints from '@/config/endpoints';
import IUser, {parseUser} from '@/types/user.type';
import {useDispatch} from 'react-redux';
import openSnackBar from '@/store/actions/snackbarActions';
import MDEditor from '@uiw/react-md-editor';
import {Simulate} from 'react-dom/test-utils';
import {axiosAuthed} from '@/services/axiosAuthed';

function Profile() {
  const {username} = useParams();
  const dispatch = useDispatch();
  const auth = useAuth();
  const [editing, setEditing] = useState(false);
  const [userObj, setUserObj] = useState<IUser>(undefined);
  if (auth.accessControl(['author', 'referee'])) {
    return auth.forbidden403;
  }
  const {response, loading, error} = useAxios(endpoints.author.getUserInfo, {
    target_username: username,
  });
  if (loading) {
    return <LinearProgress />;
  }
  if (!loading && error) {
    dispatch(openSnackBar(error, 'error'));
    return <Typography variant={'body1'}>{error}</Typography>;
  }
  if (!loading && !error && !userObj) {
    setUserObj(parseUser(response));
    return <Typography variant={'body1'}>User not found</Typography>;
  }
  console.log(userObj);
  const avatarSize = 240;
  return (
    <div>
      {userObj &&
        <Box>
          <Stack spacing={3}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={3}>
                <Box sx={{
                  width: avatarSize,
                  height: avatarSize,
                  maxWidth: '100%',
                  border: '1px solid #cccccc',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}>
                  <img src={`https://picsum.photos/${avatarSize}/${avatarSize}?random=${username}`} alt="profile" />
                </Box>
              </Grid>
              <Grid item xs={12} md={9}>
                <Stack direction={'row'} sx={{mb: 2}}>
                  <Stack direction={'column'}>
                    {editing ?
                      <TextField
                        label={'Real Name'}
                        value={userObj.realname}
                        onChange={(e) => setUserObj({...userObj, realname: e.target.value})} /> :
                      <Typography variant={'h2'}>{userObj.realname}</Typography>
                    }
                    <Typography variant={'h6'}>@{userObj.username}</Typography>
                  </Stack>
                  <Box sx={{
                    userSelect: 'none',
                    borderRadius: 1,
                    backgroundColor: blue[700],
                    color: '#FFFFFF',
                    textAlign: 'center',
                    height: '1.5rem',
                    verticalAlign: 'middle',
                    px: '0.5rem',
                    ml: '0.5rem',
                  }}>
                    <Typography sx={{
                      lineHeight: '1.5rem',
                      fontSize: '0.75rem',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                    }}>{userObj.role}</Typography>
                  </Box>
                  <Box sx={{flexGrow: 1}}></Box>
                  <Box>
                    <Button variant={editing ? 'contained' : 'outlined'}
                      onClick={() => {
                        if (editing) {
                          axiosAuthed(endpoints[userObj.role].changeInfo, {...userObj})
                              .then((res) => res.data.statusCode == 1 && dispatch(openSnackBar('User info changed', 'success')))
                              .catch((err) => dispatch(openSnackBar(err, 'error')));
                          ;
                        }
                        setEditing(!editing);
                      }}>
                      <Edit sx={{mr: 1}}/>
                      {editing ? 'Quit And Save' : 'Edit'}
                    </Button>
                  </Box>
                </Stack>
                <Grid container spacing={0}>
                  {[
                    {
                      icon: <Apartment />,
                      text: 'Affiliation',
                      value: userObj.affiliation,
                      field: 'affiliation',
                    },
                    {
                      icon: <MenuBook />,
                      text: 'Research Interests',
                      value: userObj.interest,
                      field: 'interest',
                    },
                    {
                      icon: <Web />,
                      text: 'Website',
                      value: userObj.website,
                      field: 'website',
                    },
                    {
                      icon: <Mail />,
                      text: 'Email',
                      value: userObj.email,
                      field: 'email',
                    },
                  ].map(({icon, text, value, field}, index) => (
                    <Grid key={index} item xs={12} md={6}>
                      <ListItem key={index}>
                        <ListItemButton onClick={() => {
                          if (editing) return;
                          if (field == 'website') {
                            window.open(value.startsWith('http') ? value : 'https://' + value, '_blank');
                          } else {
                            navigator.clipboard.writeText(value);
                            dispatch(openSnackBar(`Copied.`, 'info'));
                          }
                        }}>
                          <ListItemIcon>{icon}</ListItemIcon>
                          <ListItemText primary={
                            editing ?
                              <TextField
                                value={value}
                                onChange={(e) => setUserObj({...userObj, [field]: e.target.value})}
                                fullWidth
                                variant={'outlined'}
                                size={'small'} /> :
                              value
                          } secondary={text} />
                        </ListItemButton>
                      </ListItem>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <Typography variant={'h4'} sx={{my: 2}}>Biography</Typography>
            {editing ?
              <MDEditor value={userObj.bio} onChange={(val) => setUserObj({...userObj, bio: val})} /> :
              <MDEditor.Markdown source={userObj.bio} />
            }
          </Stack>
        </Box>
      }
    </div>


  );
}

export default Profile;
