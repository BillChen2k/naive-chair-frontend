import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import useAuth from '@/services/useAuth';
import {blue} from '@mui/material/colors';
import {AccountCircle, Apartment, Edit, Mail, MenuBook, Web} from '@mui/icons-material';
import useAxios from '@/services/useAxios';
import endpoints from '@/config/endpoints';
import IUser, {parseUser} from '@/types/user.type';

function Profile() {
  const {username} = useParams();
  const avatarSize = 240;
  const {accessControl, forbidden403} = useAuth();
  if (accessControl(['author', 'referee'])) {
    return forbidden403;
  }
  const {response, loading, error} = useAxios(endpoints.author.getUserInfo, {
    target_username: username,
  });
  let userObj: IUser;
  if (!loading && !error) {
    console.log(response);
    userObj = parseUser(response);
  }
  return (
    <Box>
      {loading && <LinearProgress />}
      {!loading && !error &&
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
                  <Typography variant={'h2'}>{userObj.realname}</Typography>
                  <Typography variant={'h6'}>{userObj.username}</Typography>
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
                  <Button variant={'outlined'}>
                    <Edit sx={{mr: 1}}/>
                    Edit
                  </Button>
                </Box>
              </Stack>
              <Grid container>
                {[
                  {
                    icon: <Apartment />,
                    text: 'Affiliation',
                    value: userObj.affiliation,
                  },
                  {
                    icon: <MenuBook />,
                    text: 'Research Interests',
                    value: userObj.interest,
                  },
                  {
                    icon: <Web />,
                    text: 'Website',
                    value: <a href={!userObj.website.startsWith('http') ? 'https://' + userObj.website : userObj.website}>{userObj.website}</a>,
                  },
                  {
                    icon: <Mail />,
                    text: 'Email',
                    value: userObj.email,
                  },
                ].map(({icon, text, value}, index) => (
                  <Grid key={index} item xs={12} md={6}>
                    <ListItem key={index}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText primary={value} secondary={text} />
                    </ListItem>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Typography variant={'h4'} sx={{mb: 2}}>
            Biography
          </Typography>
          {userObj.bio}
        </Stack>
      }
    </Box>
  );
}

export default Profile;
