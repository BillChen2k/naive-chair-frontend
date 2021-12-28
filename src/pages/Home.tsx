import {Component} from 'react';
import * as React from 'react';
import {Box, Button, Card, Link as MUILink, Divider, Grid, Stack, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

type Props = {};

type State = {
  content: string;
}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: '',
    };
  }

  componentDidMount() {

  }

  render() {
    const services = [
      {
        title: 'Virtual Conference Solution',
        content: 'We designed software that makes it possible to hold a scientific conference of any size virtually or hybridly.',
        learnMoreLink: '/',
      },
      {
        title: 'Conference management system',
        content: 'From managing program committees to publishing proceedings, our EasyChair system has got you covered. ' +
          'Support from over 0 million users and 1 conferences show our that professionalism has perfected managing a well-organized conference from scratch.',
        learnMoreLink: '/',
      },
      {
        title: 'Registration',
        content: 'We can create complex registration forms to support your attendee registration and make registration up in running in a few hours. ' +
          'We can help you accept online payments in 0 currencies. ' +
          'Your authors and reviewers can register using the same environment they used for submission and reviewing.',
        learnMoreLink: '/',
      },
      {
        title: 'Smart Slide',
        content: 'Our Smart Slide platform allows authors to publish their slides and users to access and/or download the slides before and after the conference. ' +
          'This facilitates rapid dissemination of research results as the content of slides is easy to acquire in a short time.',
        learnMoreLink: '/',
      },
      {
        title: 'Smart CFP',
        content: 'Within minutes, you can publish your conference call for submissions and reach our 0 million users. ' +
          'With 0 million monthly visitors, your conference is guaranteed to reach your target audience.',
        learnMoreLink: '/',
      },
      {
        title: 'Publishing',
        content: 'Our publishing services range from computing to health sciences. ' +
          'They provide fast and flexible publication of proceedings and collections in various areas of science. ' +
          'Publication services are integrated with conference management, thus providing a seamless process of submission-to-publication of reviewed content.',
        learnMoreLink: '/',
      },
    ];
    return (
      <Box>
        <Stack spacing={2} textAlign={'center'}>
          <Typography variant={'h2'}>Welcome</Typography>
          <Typography variant={'h4'}>Everything you need for your conference,</Typography>
          <Typography variant={'h5'}>None in this place.</Typography>
          <Typography variant={'body1'}>We do not have anything you need to organize a conference of any size or complexity.</Typography>
          <Divider />
          <Typography variant={'h5'} sx={{pt: 2}}>Services we do not provide</Typography>

          <Grid container spacing={2}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{p: 2}}>
                <Box sx={{p: 2}} textAlign={'left'}>
                  <Typography variant={'h6'}>{service.title}</Typography>
                  <Typography variant={'body1'} >{service.content}</Typography>
                  <MUILink sx={{p: '12'}} variant={'body1'} component={Link} to={service.learnMoreLink}>
                    Learn more
                  </MUILink>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Typography variant={'body1'}></Typography>
        </Stack>
      </Box>
    );
  }
}
