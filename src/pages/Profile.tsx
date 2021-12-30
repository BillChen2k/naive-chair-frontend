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
import useAuth from '@/services/hooks/useAuth';
import {blue} from '@mui/material/colors';
import {Apartment, Edit, Mail, MenuBook, Web} from '@mui/icons-material';
import useAxios from '@/services/hooks/useAxios';
import endpoints from '@/config/endpoints';
import IUser, {parseUser} from '@/types/user.type';
import {useDispatch} from 'react-redux';
import openSnackBar from '@/store/actions/snackbarActions';
import MDEditor from '@uiw/react-md-editor';
import {Simulate} from 'react-dom/test-utils';
import {axiosAuthed} from '@/services/axiosAuthed';
import {useSearchParams} from 'react-router-dom';
import TextBadge from '@/components/TextBadge';

function Profile() {
  const {username} = useParams();
  const dispatch = useDispatch();
  const auth = useAuth();
  const [userObj, setUserObj] = useState<IUser>(undefined);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [editing, setEditing] = useState(searchParams.has('edit'));
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
                  <TextBadge text={userObj.role} />
                  { username === auth.userObj.username &&
                    <TextBadge text={'Me'} />
                  }
                  <Box sx={{flexGrow: 1}}></Box>
                  <Box>
                    {username == auth.userObj.username &&
                      <Button variant={editing ? 'contained' : 'outlined'}
                        onClick={() => {
                          if (editing) {
                            axiosAuthed(endpoints[userObj.role].changeInfo, {...userObj})
                                .then((res) => dispatch(openSnackBar('User info changed', 'success')))
                                .catch((err) => dispatch(openSnackBar(err.message, 'error')));
                          }
                          setEditing(!editing);
                        }}>
                        <Edit sx={{mr: 1}}/>
                        {editing ? 'Quit And Save' : 'Edit'}
                      </Button>
                    }
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
