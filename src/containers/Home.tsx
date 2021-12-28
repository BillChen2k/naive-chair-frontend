import {Component} from 'react';
import * as React from 'react';
import UserService from '../services/user.service';
import {Box} from '@mui/material';

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
    return (
      <Box>
        Home
      </Box>
    );
  }
}
