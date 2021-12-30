import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {Box, Button, Grid, ListItem, ListItemIcon, ListItemText, Stack, Typography} from '@mui/material';
import useAuth from '@/services/useAuth';
import {blue} from '@mui/material/colors';
import {AccountCircle, Apartment, Edit, Mail, MenuBook} from '@mui/icons-material';

function Profile() {
  const {username} = useParams();
  const avatarSize = 240;
  const {userObj, accessControl} = useAuth();
  console.log(userObj);

  return (
    <Stack spacing={3}>
      {accessControl(['author', 'referee'])}
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
          <Stack direction={'row'} sx={{mb: 4}}>
            <Typography variant={'h2'}>{userObj.realname}</Typography>
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
          <Grid container item xs={12}>
            {[
              {
                icon: <Mail />,
                text: 'Email',
                value: userObj.email,
              },
              {
                icon: <MenuBook />,
                text: 'Research Interests',
                value: userObj.interest,
              },
              {
                icon: <Apartment />,
                text: 'Affiliation',
                value: userObj.affiliation,
              },
            ].map(({icon, text, value}, index) => (
              <Grid key={index} item spacing={3} xs={12} md={6}>
                <ListItem key={index}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={value} secondary={text} />
                </ListItem>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default Profile;
