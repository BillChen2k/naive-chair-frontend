import * as React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import AuthService from '@/services/auth.service';

type Props = {};

type State = {
  username: string,
  email: string,
  password: string,
  successful: boolean,
  message: string
};

export default class Register extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      username: '',
      email: '',
      password: '',
      successful: false,
      message: '',
    };
  }

  validationSchema = Yup.object({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters.')
        .max(20, 'Username cannot be longer than 20 characters.')
        .required('Username is required!'),
    email: Yup.string()
        .email('This is not a valid email.')
        .required('Email is required!'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters.')
        .required('Password is required!'),
  });

  async handleRegister(formValue: { username: string; email: string; password: string }) {
    const {username, email, password} = formValue;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

    this.setState({
      message: '',
      successful: false,
    });

    const result = await AuthService.register(formData);

    switch (result.statusCode) {
      case 1: {
        this.setState({
          successful: true,
          message: 'Registration successful! Please login.',
        });
      }
      case 0: {
        this.setState({
          successful: false,
          message: 'Username is already registered. Please try again.',
        });
      }
      case -1: {
        this.setState({
          successful: false,
          message: 'The parameters are missing. Please try again.',
        });
      }
      case -2: {
        this.setState({
          successful: false,
          message: 'Please use POST method',
        });
      }
    }
  }

  WithMaterialUI = () => {
    const formik = useFormik({
      initialValues: {
        username: '',
        email: '',
        password: '',
      },
      validationSchema: this.validationSchema,
      onSubmit: this.handleRegister,
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
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
