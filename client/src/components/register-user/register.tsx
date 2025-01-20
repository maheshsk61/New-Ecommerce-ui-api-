import {
  Alert,
  Box,
  FormControlLabel,
  Grid2,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import "./register.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { constant } from "../../constant";
import Buttons from "../reuse-components/button/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import {
  setCountryCode,
  setFirstName,
  setLastName,
  setEmail,
  setGender,
  setMobileNumber,
  setPassword,
  setError,
  resetUser,
  setSuccess,
  setAddress,
} from "../../Redux/slices/user"; // Assuming actions are created for updating user fields
import { user } from "../../api";
import { Link } from "react-router-dom";
import { setIsDisabledForCredentials } from "../../Redux/slices/handle-buttons";
import { IHandleButtons, IUser } from "../../interface";

const Register: React.FC = (): JSX.Element => {
  const userDetails: IUser = useSelector((state: RootState) => state.user);
  const button: IHandleButtons = useSelector(
    (state: RootState) => state.buttons
  );
  const dispatch = useDispatch<AppDispatch>();
  const handleCountry = (event: SelectChangeEvent<string>) => {
    dispatch(setCountryCode(event.target.value));
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value } = e.target;
    switch (field) {
      case "firstName":
        dispatch(setFirstName(value));
        break;
      case "lastName":
        dispatch(setLastName(value));
        break;
      case "email":
        dispatch(setEmail(value));
        break;
      case "gender":
        dispatch(setGender(value));
        break;
      case "mobileNumber":
        dispatch(setMobileNumber(value));
        break;
      case "address":
        dispatch(setAddress(value));
        break;
      case "password":
        dispatch(setPassword(value));
        break;
      default:
        break;
    }
  };
  const handleRegister = async () => {
    if (userDetails.firstName === "") {
      dispatch(setError("please enter firstname"));
      return false;
    }
    if (userDetails.lastName === "") {
      dispatch(setError("please enter lastname"));
      return false;
    }
    if (userDetails.email === "") {
      dispatch(setError("please enter email"));
      return false;
    }
    if (!userDetails.email.includes("@")) {
      dispatch(setError("Email must contain @ symbol"));
      return false;
    }
    if (userDetails.gender === "") {
      dispatch(setError("please select gender"));
      return false;
    }
    if (userDetails.countryCode === "") {
      dispatch(setError("please select countrycode"));
      return false;
    }
    if (userDetails.mobileNumber === "") {
      dispatch(setError("please enter mobile number"));
      return false;
    }
    if (userDetails.password === "") {
      dispatch(setError("please create password"));
      return false;
    }
    const payload = {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      gender: userDetails.gender,
      countryCode: userDetails.countryCode,
      mobileNumber: userDetails.mobileNumber,
      address: userDetails.address,
      password: userDetails.password,
    };
    //console.log("Payload:", payload);
    dispatch(setIsDisabledForCredentials(true));
    try {
      const response = await user(payload);
      //console.log(response.status)
      if (response.status === 201) {
        dispatch(setSuccess(response.data.message));
        dispatch(setIsDisabledForCredentials(false));
      }
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      dispatch(resetUser());
      setTimeout(() => {
        dispatch(setSuccess(""));
      }, 5000);
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
          <InputLabel sx={{ mr: 1 }}>
            <i>{constant.firstName}</i>
          </InputLabel>
          <TextField
            className="text-field"
            type="text"
            value={userDetails.firstName}
            onChange={(e) =>
              handleInputChange(
                e as React.ChangeEvent<HTMLInputElement>,
                "firstName"
              )
            }
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <InputLabel sx={{ mr: 1 }}>
            <i>{constant.lastName}</i>
          </InputLabel>
          <TextField
            className="text-field"
            type="text"
            value={userDetails.lastName}
            onChange={(e) =>
              handleInputChange(
                e as React.ChangeEvent<HTMLInputElement>,
                "lastName"
              )
            }
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <InputLabel sx={{ mr: 1 }}>
            <i>{constant.email}</i>
          </InputLabel>
          <TextField
            className="text-field"
            type="email"
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
          <InputLabel sx={{ mr: 1 }}>
            <i>{constant.gender}</i>
          </InputLabel>
          <RadioGroup
            row
            value={userDetails.gender}
            onChange={(e) => dispatch(setGender(e.target.value))}
          >
            <FormControlLabel
              value={constant.male}
              label={constant.male.toLowerCase()}
              control={<Radio />}
            />
            <FormControlLabel
              value={constant.female}
              label={constant.female.toLowerCase()}
              control={<Radio />}
            />
          </RadioGroup>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <InputLabel sx={{ mr: 1 }}>
            <i>{constant.mobileNumber}</i>
          </InputLabel>
          <TextField
            className="text-field"
            type="number"
            sx={{ mb: 1 }}
            value={userDetails.mobileNumber}
            onChange={(e) =>
              handleInputChange(
                e as React.ChangeEvent<HTMLInputElement>,
                "mobileNumber"
              )
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Select
                    onChange={handleCountry}
                    value={userDetails.countryCode}
                    variant="standard"
                    disableUnderline
                    IconComponent={ExpandMoreIcon}
                  >
                    <MenuItem value="+91">+91</MenuItem>
                    <MenuItem value="+1">+1</MenuItem>
                    <MenuItem value="+44">+44</MenuItem>
                  </Select>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <InputLabel sx={{ mr: 1 }}>
            <i>{constant.address}</i>
          </InputLabel>
          <TextField
            className="text-field"
            type="text"
            value={userDetails.address}
            onChange={(e) =>
              handleInputChange(
                e as React.ChangeEvent<HTMLInputElement>,
                "address"
              )
            }
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <InputLabel sx={{ mr: 1 }}>
            <i>{constant.password}</i>
          </InputLabel>
          <TextField
            className="text-field"
            type="password"
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
            value={constant.register}
            onClick={handleRegister}
            type="submit"
            isDisabled={button.isDisabledForCredentials}
          />
        </Box>
        <Link
          to="/login"
          onClick={() => {
            dispatch(resetUser());
            dispatch(setSuccess(""));
          }}
          style={{ textDecoration: "none", textAlign: "center" }}
        >
          <Typography>{constant.clickToLogin}</Typography>
        </Link>
      </Box>
    </Grid2>
  );
};

export default Register;
