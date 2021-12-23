import { Component } from "react";
import { useFormik} from "formik";
import * as Yup from "yup";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import AuthService from "@/services/auth.service";

type State = {
  username: string,
  password: string,
  loading: boolean,
  message: string
};

type Props = {};

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  validationSchema = Yup.object({
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .required("This field is required!"),
  });

  WithMaterialUI = () => {
    const formik = useFormik({
      initialValues : { 
        username: "",
        password: "",
      },
      validationSchema: this.validationSchema,
      onSubmit: this.handleLogin,
    });
  
    return (
      <div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
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

  async handleLogin(formValue: { username: string; password: string }) {
    const { username, password } = formValue;
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    let result = await AuthService.login(formData);
  }

  render() {
    return <this.WithMaterialUI />;
  }
}