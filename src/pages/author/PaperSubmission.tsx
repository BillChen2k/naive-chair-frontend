import React from 'react';
import TextField from '@mui/material/TextField';
import useAuth from '@/services/useAuth';
import PaperService from '@/services/paperService';
import {makeStyles} from '@mui/material/styles';
import {UserRole, IUser} from '@/types/user.type';
import MuiContainer from '@mui/material/Container';
import {assert} from 'console';
import {useFormik, Formik, Form, FieldArray, getIn} from 'formik';
import {AlertColor, Box, Button, FormGroup, FormControl, InputLabel, MenuItem, Select, Stack, Typography} from '@mui/material';
import * as Yup from 'yup';

function PaperSubmission() {
  const auth = useAuth();
  assert(auth.isAuthenticated, 'You must be authenticated to access this page.');

  const token: string = auth.token;
  const userObj: IUser = auth.userObj;

  // provide file uploading with text of abstraction

  const validationSchema = Yup.object().shape({
    abstract: Yup.string()
        .required('This field is required!'),
    file: Yup.mixed()
        .required('file is required!'),
    authors: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required('Name is required!'),
          affiliation: Yup.string().required('Affiliation is required!'),
        }),
    ).required('Authors are required!'),
  });

  const handleSubmit = async (formValue: {abstract: string, file: File, authors: string[]}) => {
    const formData = new FormData();
    formData.append('abstract', formValue.abstract);
    formData.append('file', formValue.file);
    formData.append('authors', formValue.authors.join('|'));
    const result = await PaperService.submitPaper(formData, userObj, token);
    console.log(result);
  };

  const formik = useFormik({
    initialValues: {
      abstract: '',
      file: null,
      authors: [],
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });


  return ( <p>placeholder</p> /*
    <div className={MuiContainer}>
    <Formik
      initialValues={formik.initialValues}
      validationSchema={formik.validationSchema}
      onSubmit={formik.onSubmit}
    >
      {({ values, touched, errors, handleChange, handleBlur, isValid }) => (
        <Form noValidate autoComplete="off">
          <FieldArray name="people">
            {({ push, remove }) => (
              <div>
                {values.people.map((p, index) => {
                  const firstName = `people[${index}].firstName`;
                  const touchedFirstName = getIn(touched, firstName);
                  const errorFirstName = getIn(errors, firstName);

                  const lastName = `people[${index}].lastName`;
                  const touchedLastName = getIn(touched, lastName);
                  const errorLastName = getIn(errors, lastName);

                  return (
                    <div key={p.id}>
                      <TextField
                        className={classes.field}
                        margin="normal"
                        variant="outlined"
                        label="First name"
                        name={firstName}
                        value={p.firstName}
                        required
                        helperText={
                          touchedFirstName && errorFirstName
                            ? errorFirstName
                            : ""
                        }
                        error={Boolean(touchedFirstName && errorFirstName)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <TextField
                        className={classes.field}
                        margin="normal"
                        variant="outlined"
                        label="Last name"
                        name={lastName}
                        value={p.lastName}
                        required
                        helperText={
                          touchedLastName && errorLastName
                            ? errorLastName
                            : ""
                        }
                        error={Boolean(touchedLastName && errorLastName)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Button
                        className={classes.button}
                        margin="normal"
                        type="button"
                        color="secondary"
                        variant="outlined"
                        onClick={() => remove(index)}
                      >
                        x
                      </Button>
                    </div>
                  );
                })}
                <Button
                  className={classes.button}
                  type="button"
                  variant="outlined"
                  onClick={() =>
                    push({ id: Math.random(), firstName: "", lastName: "" })
                  }
                >
                  Add
                </Button>
              </div>
            )}
          </FieldArray>
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          <Button
            className={classes.button}
            type="submit"
            color="primary"
            variant="contained"
            // disabled={!isValid || values.people.length === 0}
          >
            submit
          </Button>
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          {debug && (
            <>
              <pre style={{ textAlign: "left" }}>
                <strong>Values</strong>
                <br />
                {JSON.stringify(values, null, 2)}
              </pre>
              <pre style={{ textAlign: "left" }}>
                <strong>Errors</strong>
                <br />
                {JSON.stringify(errors, null, 2)}
              </pre>
            </>
          )}
        </Form>
      )}
    </Formik>
  </div>
  */

  /**
    <Box>
      {auth.accessControl(['author' as UserRole])}
      {status === LoginStatus.SUCCESS && (
        <Navigate to={'/'} replace={true} />
      )}
      <Stack spacing={1}>
        <Typography variant={'h4'}>Login</Typography>
        <Typography>Welcome to the NaiveChair.</Typography>
      </Stack>
      <Box component={'form'} onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
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
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Stack>
      </Box>
    </Box>
    */
  );
}

export default PaperSubmission;
