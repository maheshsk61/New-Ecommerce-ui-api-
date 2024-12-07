import {
  AppBar,
  Box,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import "./navbar.scss";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { constant } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { setSearchQuery } from "../../Redux/slices/search-query";
import { IHandleButtons, ISearchQuery } from "../../interface";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

const Navbar: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    dispatch(setSearchQuery(value));
  };
  const searchQuery: ISearchQuery = useSelector(
    (state: RootState) => state.search
  );
  //console.log(`searchQuery ${searchQuery.query}`)
  const button: IHandleButtons = useSelector(
    (state: RootState) => state.buttons
  );

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
          <Typography variant="h6">
            <Link
              to="/"
              className="text-white text-decoration-none"
              onClick={() => {
                dispatch(setSearchQuery(""));
              }}
            >
              <i>{constant.shopBazaar}</i>
            </Link>
          </Typography>
          <TextField
            type="search"
            value={searchQuery.query}
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
          <Box>
            <Link to="/cart" style={{ color: "var(--white-color)" }}>
              <ShoppingCartCheckoutIcon />
            </Link>
            <Typography component="span">
              {button.count ? button.count : 0}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
