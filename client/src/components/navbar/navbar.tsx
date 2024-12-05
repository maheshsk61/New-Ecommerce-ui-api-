import {
  AppBar,
  Box,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import { constant } from "./constant";

const Navbar: React.FC = (): JSX.Element => {
  const handleSearch=()=>{

  }
  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar
          className="navbar"
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Typography variant="h6"><i>{constant.shopBazaar}</i></Typography>
          <TextField
            type="search"
            placeholder={constant.searchProductsHere}
            variant="outlined"
            className="search-field"
            onChange={handleSearch}
            sx={{
              borderRadius: 10,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: "var(--black-color)" }} />
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
