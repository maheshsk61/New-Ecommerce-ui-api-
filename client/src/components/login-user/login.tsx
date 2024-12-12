import {
  Alert,
  Box,
  Grid2,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { constant } from "../../constant";
import { Link, useNavigate } from "react-router-dom";
import Buttons from "../reuse-components/button/button";
import { userValidate } from "../../api";
import { AppDispatch, RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUser,
  setEmail,
  setError,
  setPassword,
  setSuccess,
} from "../../Redux/slices/user";
import { setIsDisabled } from "../../Redux/slices/handle-buttons";
import { IHandleButtons, IUser } from "../../interface";

const Login: React.FC = (): JSX.Element => {
  const userDetails: IUser = useSelector((state: RootState) => state.user);
  const button: IHandleButtons = useSelector(
    (state: RootState) => state.buttons
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    switch (field) {
      case "email":
        dispatch(setEmail(e.target.value));
        break;
      case "password":
        dispatch(setPassword(e.target.value));
        break;
      default:
        break;
    }
  };
  const handleLogin = async () => {
    if (userDetails.email === "") {
      dispatch(setError("please enter email"));
      return false;
    }
    if (userDetails.password === "") {
      dispatch(setError("please enter password"));
      return false;
    }
    const payload = {
      email: userDetails.email,
      password: userDetails.password,
    };
    dispatch(setIsDisabled(true));
    try {
      const response = await userValidate(payload);
      if (response.status === 200) {
        dispatch(setError(""));
        dispatch(setSuccess(response.data.message));
        dispatch(setIsDisabled(false));
        //dispatch(setUser(response.data.user));
        //dispatch(resetUser());
        localStorage.setItem("user",JSON.stringify(response.data.user))
        setTimeout(() => {
          navigate("/home");
        },1000);
      }
      //console.log(response);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        //console.log(error.response.data.message);
        dispatch(setError(error.response.data.message));
      } else {
        //console.log(error.response.data.message);
        dispatch(setError("An unexpected error occurred"));
      }
      dispatch(setIsDisabled(false));
      return Promise.reject(error);
    } finally {
      setTimeout(() => {
        dispatch(setSuccess(""));
      }, 1000);
    }
  };
  const handleFormSubmission = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <Grid2
      sx={{
        gridColumn: {
          xs: "span 12",
          sm: "span 6",
          md: "span 4",
          lg: "span 4",
          xl: "span 3",
        },
        height: "100vh",
      }}
      className="d-flex flex-column align-items-center w-100 justify-content-center"
    >
      <Box component="form" onSubmit={handleFormSubmission}>
        {userDetails.error && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {userDetails.error}
          </Alert>
        )}
        {userDetails.success && (
          <Alert severity="success" sx={{ mb: 1 }}>
            {userDetails.success}
          </Alert>
        )}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <InputLabel sx={{ mr: 1 }}>{constant.email}</InputLabel>
          <TextField
            variant="outlined"
            type="email"
            className="text-field"
            value={userDetails.email}
            onChange={(e) =>
              handleInputChange(
                e as React.ChangeEvent<HTMLInputElement>,
                "email"
              )
            }
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <InputLabel sx={{ mr: 1 }}>{constant.password}</InputLabel>
          <TextField
            variant="outlined"
            type="password"
            className="text-field"
            value={userDetails.password}
            onChange={(e) =>
              handleInputChange(
                e as React.ChangeEvent<HTMLInputElement>,
                "password"
              )
            }
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Center horizontally
            mb: 1,
          }}
        >
          <Buttons
            value={constant.login}
            onClick={handleLogin}
            type="submit"
            isDisabled={button.isDisabled}
          />
        </Box>
        <Link
          to="/register"
          onClick={() => dispatch(resetUser())}
          style={{ textDecoration: "none", textAlign: "center" }}
        >
          <Typography>{constant.clickToRegister}</Typography>
        </Link>
      </Box>
    </Grid2>
  );
};
export default Login;
