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
import useAuth from '@/services/useAuth';

export interface ErrorMessage {
  alertType: AlertColor,
  message: string,
}

enum SubmitStatus {
  NOT_ATTEMPTED,
  SUCCESS,
  WRONG_HTTP_REQ,
  WRONG_CREDENTIALS,
  MISSING_PARAMETERS,
}

export default function PaperSubmission() {
  const [status, setStatus] = useState<SubmitStatus>(SubmitStatus.NOT_ATTEMPTED);
  const [message, setMessage] = useState<string>('');
  const dispatch = useDispatch();
  const auth = useAuth();

  const handleSubmit = async (formValue: { abstract: string; file: string; role: 'author' | 'referee' }) => {
    const {abstract, file, role} = formValue;
    const formData = new FormData();
    formData.append('abstract', abstract);
    formData.append('file', file);
    formData.append('role', role);
    const result = await auth.signIn(formData);
    console.log(result);
    switch (result.statusCode) {
      case -2: {
        setStatus(SubmitStatus.WRONG_HTTP_REQ);
        setMessage('Wrong HTTP request.');
        break;
      }
      case 0: {
        setStatus(SubmitStatus.WRONG_CREDENTIALS);
        setMessage('Wrong abstract or file.');
        dispatch(openSnackBar('Failed to login: Wrong credentials', 'error'));
        break;
      }
      case 1: {
        setStatus(SubmitStatus.SUCCESS);
        setMessage('Successfully logged in.');
        dispatch(openSnackBar('Submit successful.', 'success'));
      }
      case -1: {
        setStatus(SubmitStatus.MISSING_PARAMETERS);
        setMessage('Missing parameters.');
        break;
      }
    }
  };

  const validationSchema = Yup.object({
    abstract: Yup.string()
        .min(1, 'Abstract must be at least 3 characters.')
        .max(1000, 'Abstract must be at most 1000 characters.')
        .required('This field is required!'),
    file: Yup.mixed().required('This field is required!'),
  });

  const formik = useFormik({
    initialValues: {
      abstract: '',
      file: null,
      role: 'author',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box>
      {/* A <Navigate> element changes the current location when it is rendered. */}
      {status === SubmitStatus.SUCCESS && (
        <Navigate to={'/'} replace={true} />
      )}
      <Stack spacing={1}>
        <Typography variant={'h4'}>Submit</Typography>
        <Typography>Welcome to the NaiveChair.</Typography>
      </Stack>
      <Box component={'form'} onSubmit={formik.handleSubmit} sx={{mt: 2}}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            id="abstract"
            name="abstract"
            label="Abstract"
            value={formik.values.abstract}
            onChange={formik.handleChange}
            error={formik.touched.abstract && Boolean(formik.errors.abstract)}
            helperText={formik.touched.abstract && formik.errors.abstract}
          />
          <TextField
            fullWidth
            id="file"
            name="file"
            label="File"
            type="file"
            value={formik.values.file}
            onChange={formik.handleChange}
            error={formik.touched.file && Boolean(formik.errors.file)}
            helperText={formik.touched.file && formik.errors.file}
          />
          <FormControl fullWidth>
            <InputLabel id={'input-role-label'}>Submit as</InputLabel>
            <Select
              defaultValue={'author'}
              id={'input-role-label'}
              name={'role'}
              label="Select Role"
              value={formik.values.role}
              onChange={formik.handleChange}
            >
              <MenuItem value={'author'}>Author</MenuItem>
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
