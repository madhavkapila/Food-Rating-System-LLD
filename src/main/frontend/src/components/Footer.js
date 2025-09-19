import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import TwitterIcon from '@mui/icons-material/Twitter';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'primary.main',
        color: '#ffffff',
        py: 6, 
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <RestaurantMenuIcon sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontFamily: 'Playfair Display, serif', letterSpacing: 1 }}>
                CULINARY RATINGS
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              Discover the highest-rated culinary delights across various cuisines. 
              A sophisticated implementation of the Food Rating System.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" sx={{ color: '#ffffff' }}>
                <FacebookIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: '#ffffff' }}>
                <TwitterIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: '#ffffff' }}>
                <InstagramIcon />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ color: '#ffffff' }}
                component={Link}
                href="https://github.com/madhavkapila/Food-Rating-System-LLD"
                target="_blank"
              >
                <GitHubIcon />
              </IconButton>
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Typography variant="subtitle2" sx={{ mb: 2, color: '#ffffff' }}>
                  Resources
                </Typography>
                <Stack spacing={1}>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Documentation</Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>API References</Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Design System</Link>
                </Stack>
              </Grid>
              
              <Grid item xs={6} sm={4}>
                <Typography variant="subtitle2" sx={{ mb: 2, color: '#ffffff' }}>
                  About
                </Typography>
                <Stack spacing={1}>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Project</Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Team</Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Partners</Link>
                </Stack>
              </Grid>
              
              <Grid item xs={6} sm={4}>
                <Typography variant="subtitle2" sx={{ mb: 2, color: '#ffffff' }}>
                  Support
                </Typography>
                <Stack spacing={1}>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Help Center</Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Contact Us</Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>Privacy Policy</Link>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} Culinary Ratings. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            An elegant implementation of LeetCode's Food Rating System
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;