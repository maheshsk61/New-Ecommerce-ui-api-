import {
  AppBar,
  Box,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import "./navbar.scss";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { constant } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { setSearchQuery } from "../../Redux/slices/search-query";
import { IHandleButtons, ISearchQuery } from "../../interface";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useEffect, useState } from "react";
import { resetUser, setUser } from "../../Redux/slices/user";

const Navbar: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const userDetails = useSelector((state: RootState) => state.user);
  //console.log(userDetails);
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
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  //console.log(openMenu);
  const handleLogout = () => {
    dispatch(resetUser());
    navigate("/login");
    setAnchorEl(null);
    localStorage.removeItem("user");
  };
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser) {
      dispatch(setUser((storedUser)));
    }
  }, [dispatch]);
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
              to="/home"
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
            <IconButton
              sx={{ color: "var(--white-color)" }}
              onClick={handleMenuClick}
            >
              <PersonIcon />
            </IconButton>
            <Menu
              open={openMenu}
              onClose={handleMenuClose}
              anchorEl={anchorEl}
              disableScrollLock
            >
              <MenuItem
                onClick={handleLogout}
                sx={{ color: "var(--black-color)" }}
              >
                {constant.logout}
              </MenuItem>
            </Menu>
            <Typography component="span">
              {userDetails.user && userDetails.user.firstName}{" "}
              {userDetails.user && userDetails.user.lastName}
            </Typography>
          </Box>
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
