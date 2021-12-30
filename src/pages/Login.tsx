import * as React from 'react';
import {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {AlertColor, Box, FormControl, InputLabel, MenuItem, Select, Stack, Typography} from '@mui/material';
import openSnackBar from '@/store/actions/snackbarActions';
import {useDispatch} from 'react-redux';
import {Navigate} from 'react-router-dom';
import useAuth from '@/services/hooks/useAuth';

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

export default function Login() {
  const [status, setStatus] = useState<LoginStatus>(LoginStatus.NOT_ATTEMPTED);
  const [message, setMessage] = useState<string>('');
  const dispatch = useDispatch();
  const auth = useAuth();

  const handleLogin = async (formValue: { username: string; password: string; role: 'author' | 'referee' }) => {
    const {username, password, role} = formValue;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('role', role);
    const result = await auth.signIn(formData);
    console.log(result);
    switch (result.statusCode) {
      case -2: {
        setStatus(LoginStatus.WRONG_HTTP_REQ);
        setMessage('Wrong HTTP request.');
        break;
      }
      case 0: {
        setStatus(LoginStatus.WRONG_CREDENTIALS);
        setMessage('Wrong username or password.');
        dispatch(openSnackBar('Failed to login: Wrong credentials', 'error'));
        break;
      }
      case 1: {
        setStatus(LoginStatus.SUCCESS);
        setMessage('Successfully logged in.');
        dispatch(openSnackBar('Login successful.', 'success'));
      }
      case -1: {
        setStatus(LoginStatus.MISSING_PARAMETERS);
        setMessage('Missing parameters.');
        break;
      }
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters.')
        .required('This field is required!'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters.')
        .required('This field is required!'),
    role: Yup.string()
        .matches(/^(author|referee)$/, 'Role must be either author or referee.')
        .required('This field is required!'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      role: 'author',
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <Box>
      {/* A <Navigate> element changes the current location when it is rendered. */}
      {status === LoginStatus.SUCCESS && (
        <Navigate to={'/'} replace={true} />
      )}
      <Stack spacing={1}>
        <Typography variant={'h4'}>Login</Typography>
        <Typography>Welcome to the NaiveChair.</Typography>
      </Stack>
      <Box component={'form'} onSubmit={formik.handleSubmit} sx={{mt: 2}}>
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
              value={formik.values.role}
              onChange={formik.handleChange}
            >
              <MenuItem value={'author'}>Author</MenuItem>
              <MenuItem value={'referee'}>Referee</MenuItem>
            </Select>
          </FormControl>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
