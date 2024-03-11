import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import logo from './logistics_logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';

const pages = ['CPM', 'POSREDNIK'];

function Header() {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (

    <AppBar position="static"
    sx={{ bgcolor: "#111111" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
                <Link to="/" >
                    <img
                        alt="BOiL"
                        src={logo}
                        height={50}
                    />
                </Link>
            </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => {
                    const link = "/" + page.toLowerCase();
                    console.log(link);
                    navigate(page);
                    }}>

                    <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{ mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1 }}>
                <Link to="/" >
                    <img
                        alt="BOiL"
                        src={logo}
                        height={50}
                    />
                </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                    const link = "/" + page.toLowerCase();
                    console.log(link);
                    navigate(page);
                    }}
                sx={{ my: 2, color: 'white', display: 'block', fontSize: 18 }}
              >
                {page}
              </Button>
            ))}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;