import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Box sx={{ py: 3 }}>
          <Outlet />
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;