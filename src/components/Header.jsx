import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { purple } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const drawerWidth = 240;
let navItems = [
  { text: 'Home', href: '/' },
  { text: 'Item', href: '/item' },
  { text: 'SignUp', href: '/join' },
  { text: 'LogIn', href: '/login' },
];

export default function Header(props) {
  const login = useSelector((state) => state.users.isLogin);
  const [isLogin, setIsLogin] = React.useState(false);

  React.useEffect(() => {
    setIsLogin(login);
  });

  if (isLogin) {
    navItems = [
      { text: 'Home', href: '/' },
      { text: 'Item', href: '/item' },
      { text: 'SignUp', href: '/join' },
      { text: 'Logout', href: '/logout' },
    ];
  }

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: purple[400],
      },
      secondary: {
        main: '#f44336',
      },
    },
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        KDT
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText
                primary={
                  <Link
                    to={item.href}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    {item.text}
                  </Link>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <ThemeProvider theme={theme}>
        <AppBar component="nav" color="primary">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: 'none', sm: 'block' },
                textAlign: 'left',
                ml: 4,
              }}
            >
              KDT1
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, mr: 6 }}>
              {navItems.map((item) => {
                return (
                  <Button key={item.text} sx={{ color: '#fff', ml: 4 }}>
                    <Link
                      to={item.href}
                      style={{
                        textDecoration: 'none',
                        color: 'white',
                        fontSize: '1.2em',
                      }}
                    >
                      {item.text}
                    </Link>
                  </Button>
                );
              })}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
        </Box>
      </ThemeProvider>
    </Box>
  );
}
