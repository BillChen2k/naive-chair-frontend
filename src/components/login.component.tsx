import * as React from 'react';
import {Component} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {AlertMessage} from '@/services/alert.service';
import {Alert, AlertColor} from '@mui/material';

import AuthService from '@/services/auth.service';

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

type State = {
  status: LoginStatus;
  message: string
};

type Props = {};

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      status: LoginStatus.NOT_ATTEMPTED,
      message: '',
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

  async handleLogin(formValue: { username: string; password: string }): Promise<JSX.Element> {
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
        return <AlertMessage alertInfo={msg}/>;
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


  WithMaterialUI = () => {
    const formik = useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      validationSchema: this.validationSchema,
      onSubmit: this.handleLogin,
    });

    return (
      <div>
        <form onSubmit={formik.handleSubmit}>
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
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  };

  render() {
    return <this.WithMaterialUI />;
  }
}
