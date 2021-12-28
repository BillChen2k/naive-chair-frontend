import * as React from 'react';
import {Component} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {AlertColor, Box, FormControl, InputLabel, MenuItem, Select, Stack, Typography} from '@mui/material';

import AuthService from '@/services/auth.service';
import openSnackBar from '@/store/actions/snackbarActions';
import {connect} from 'react-redux';

export interface ErrorMessage {
  alertType: AlertColor,
  message: string,
}

enum LoginStatus {
  NOT_ATTEMPTED,
  SUCCESS,
  WRONG_HTTP_REQ,
  WRONG_CREDENTIALS,
  MISSING_PARAMETERS,
}

type ILoginState = {
  status: LoginStatus;
  message: string;
  snackbarOpen: boolean;
};


class Login extends Component<any, ILoginState> {

  constructor(props: any) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      status: LoginStatus.NOT_ATTEMPTED,
      message: '',
      snackbarOpen: false,
    };
  }

  validationSchema = Yup.object({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters.')
        .required('This field is required!'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters.')
        .required('This field is required!'),
  });

  async handleLogin(formValue: { username: string; password: string }) {
    const {dispatch} = this.props;
    const {username, password} = formValue;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    const result = await AuthService.login(formData);
    console.log(result);
    switch (result.statusCode) {
      case -2: {
        this.setState({
          status: LoginStatus.WRONG_HTTP_REQ,
          message: 'Wrong HTTP request.',
        });
        break;
      }
      case 0: {
        this.setState({
          status: LoginStatus.WRONG_CREDENTIALS,
          message: 'Wrong credentials.',
        });
        const msg: ErrorMessage = {
          alertType: 'error',
          message: 'Wrong credentials.',
        };
        dispatch(openSnackBar('Failed to login: Wrong credentials', 'error'));
        break;
      }
      case 1: {
        this.setState({
          status: LoginStatus.SUCCESS,
          message: 'Login successful.',
        });
        break;
      }
      case -1: {
        this.setState({
          status: LoginStatus.MISSING_PARAMETERS,
          message: 'Missing parameters.',
        });
        break;
      }
    }

    console.log(result);
  }


  useMaterialUI = () => {
    const formik = useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      validationSchema: this.validationSchema,
      onSubmit: this.handleLogin,
    });

    return (
      <Box>
        <Typography sx={{m: 1}} variant={'h4'}>Login</Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControl fullWidth>
              <InputLabel id={'input-role-label'}>Login as</InputLabel>
              <Select
                defaultValue={'author'}
                id={'input-role-label'}
                name={'role'}
                label="Select Role"
              >
                <MenuItem value={'author'}>Author</MenuItem>
                <MenuItem value={'referee'}>Referee</MenuItem>
              </Select>
            </FormControl>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    );
  };

  render() {
    return <this.useMaterialUI />;
  }
}

/**
 * React hooks can only be called in **function based components**. So to use dispatch in a class based component
 * The `connect` API is needed. (See https://react-redux.js.org/api/connect#connect)
 */
export default connect()(Login);
