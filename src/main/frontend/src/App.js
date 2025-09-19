import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import TenantDetails from './pages/TenantDetails';
import TenantList from './pages/TenantList';

// Create a theme instance with elegant, food-related colors
const theme = createTheme({
  palette: {
    primary: {
      light: '#f9683a',
      main: '#BF4904', // Rich terracotta - warm, appetizing color
      dark: '#8a3000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#6fbf73',
      main: '#2E7D32', // Deep forest green - fresh herbs/ingredients
      dark: '#1b5e20',
      contrastText: '#fff',
    },
    background: {
      default: '#fcfaf7', // Warm cream - like parchment/menu paper
      paper: '#ffffff',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ed6c02',
    },
    info: {
      main: '#0288d1',
    },
    success: {
      main: '#2e7d32',
    },
    divider: 'rgba(130, 117, 78, 0.12)',
  },
  typography: {
    fontFamily: '"Playfair Display", "Garamond", serif',
    h1: {
      fontWeight: 600,
      fontFamily: '"Playfair Display", "Garamond", serif',
      letterSpacing: '0.5px',
    },
    h2: {
      fontWeight: 600,
      fontFamily: '"Playfair Display", "Garamond", serif',
      letterSpacing: '0.5px',
    },
    h3: {
      fontWeight: 600,
      fontFamily: '"Playfair Display", "Garamond", serif',
    },
    h4: {
      fontFamily: '"Playfair Display", "Garamond", serif',
    },
    h5: {
      fontFamily: '"Playfair Display", "Garamond", serif',
    },
    h6: {
      fontFamily: '"Playfair Display", "Garamond", serif',
    },
    subtitle1: {
      fontFamily: '"Open Sans", "Roboto", "Helvetica", sans-serif',
    },
    subtitle2: {
      fontFamily: '"Open Sans", "Roboto", "Helvetica", sans-serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"Open Sans", "Roboto", "Helvetica", sans-serif',
    },
    body2: {
      fontFamily: '"Open Sans", "Roboto", "Helvetica", sans-serif',
    },
    button: {
      fontFamily: '"Open Sans", "Roboto", "Helvetica", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.15),0px 1px 1px 0px rgba(0,0,0,0.1),0px 1px 3px 0px rgba(0,0,0,0.08)',
    '0px 3px 3px -2px rgba(0,0,0,0.15),0px 2px 4px 0px rgba(0,0,0,0.1),0px 1px 8px 0px rgba(0,0,0,0.08)',
    '0px 3px 4px -2px rgba(0,0,0,0.15),0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 10px 0px rgba(0,0,0,0.08)',
    // Rest of shadow array...
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
        },
        contained: {
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tenants" element={<TenantList />} />
          <Route path="tenants/:tenantId" element={<TenantDetails />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;