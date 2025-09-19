import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.9),
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo - Desktop */}
          <RestaurantMenuIcon 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              mr: 1.5,
              fontSize: 32
            }} 
          />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 4,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
              borderRight: '1px solid',
              borderColor: 'divider',
              paddingRight: 4,
            }}
          >
            CULINARY RATINGS
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <RoomServiceIcon />
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
              <MenuItem onClick={handleCloseNavMenu} component={RouterLink} to="/">
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} component={RouterLink} to="/tenants">
                <Typography textAlign="center">Culinary Lists</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Logo - Mobile */}
          <RestaurantMenuIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CULINARY RATINGS
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={RouterLink}
              to="/"
              onClick={handleCloseNavMenu}
              sx={{ 
                my: 2, 
                color: '#ffffff', 
                display: 'block', 
                mx: 1,
                fontSize: '1.05rem',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              Home
            </Button>
            <Button
              component={RouterLink}
              to="/tenants"
              onClick={handleCloseNavMenu}
              sx={{ 
                my: 2, 
                color: '#ffffff', 
                display: 'block', 
                mx: 1,
                fontSize: '1.05rem',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              Culinary Lists
            </Button>
          </Box>

          {/* Right Side - Add Restaurant Button */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Add New Rating List">
              <Button 
                variant="outlined" 
                color="inherit"
                component={RouterLink}
                to="/tenants"
                sx={{ 
                  borderColor: '#ffffff', 
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    borderColor: '#ffffff',
                  }
                }}
              >
                Add List
              </Button>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;