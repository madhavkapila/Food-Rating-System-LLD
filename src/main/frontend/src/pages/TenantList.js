import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import CreateTenantDialog from '../components/CreateTenantDialog';
import TenantCard from '../components/TenantCard';
import foodRatingsService from '../services/foodRatingsService';
import { mockTenants } from '../services/mockData';

// Animation variants for list items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

const TenantList = () => {
  const [tenants, setTenants] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load tenants when the component mounts
  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      setLoading(true);
      // Try to get tenants from API
      const data = await foodRatingsService.getAllTenants();
      setTenants(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch tenants from API, using mock data', err);
      // Fall back to mock data if API fails
      setTenants(mockTenants);
      setError('Could not connect to the server. Showing demo data instead.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTenant = async (tenantName) => {
    try {
      await foodRatingsService.createTenant(tenantName);
      // Refresh the list of tenants
      fetchTenants();
    } catch (err) {
      console.error('Failed to create tenant:', err);
      // For demo purposes, add the tenant locally anyway
      setTenants([...tenants, tenantName]);
    }
  };

  return (
    <Container maxWidth="lg">
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{ 
          p: 4, 
          mb: 6, 
          mt: 2,
          borderRadius: 4,
          backgroundImage: `linear-gradient(120deg, ${alpha('#ff9800', 0.05)} 0%, ${alpha('#f44336', 0.1)} 100%)`,
          border: '1px solid',
          borderColor: alpha('#ff9800', 0.1),
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              mr: 3,
              bgcolor: alpha('#ff9800', 0.1),
              p: 1.5,
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FormatListBulletedIcon sx={{ fontSize: 36, color: 'primary.main' }} />
          </Box>
          <Box>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 700, 
                fontFamily: 'Playfair Display, serif',
                mb: 1
              }}
            >
              Food Rating Lists
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Browse all your food rating collections or create a new one
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box>
            <Typography variant="body1">
              <strong>{tenants.length}</strong> food rating {tenants.length === 1 ? 'list' : 'lists'} available
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            color="primary"
            size="large"
            startIcon={<AddCircleIcon />}
            onClick={() => setDialogOpen(true)}
            sx={{ 
              fontWeight: 600, 
              borderRadius: 2,
              px: 3,
              py: 1.2,
              boxShadow: '0 4px 12px rgba(255, 152, 0, 0.2)'
            }}
          >
            Create New List
          </Button>
        </Box>
      </Paper>

      {error && (
        <Alert 
          severity="info" 
          sx={{ 
            mb: 4, 
            borderRadius: 2,
            '& .MuiAlert-icon': {
              fontSize: '1.5rem'
            }
          }}
        >
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: 300,
          py: 8
        }}>
          <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
          <Typography variant="h6" color="text.secondary">
            Loading food rating lists...
          </Typography>
        </Box>
      ) : tenants.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4}>
            {tenants.map((tenant, index) => (
              <Grid item key={tenant} xs={12} sm={6} md={4} component={motion.div} variants={itemVariants}>
                <TenantCard tenant={tenant} />
              </Grid>
            ))}
          </Grid>
        </motion.div>
      ) : (
        <Paper
          elevation={0}
          sx={{ 
            p: 5, 
            textAlign: 'center',
            borderRadius: 4,
            bgcolor: alpha('#f5f5f5', 0.6),
            border: '1px dashed',
            borderColor: 'divider'
          }}
        >
          <StorefrontIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.7 }} />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            No Food Rating Lists Yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
            Create your first food rating list to start organizing and rating your favorite foods by cuisine.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            size="large"
            startIcon={<AddCircleIcon />}
            onClick={() => setDialogOpen(true)}
            sx={{ fontWeight: 600, borderRadius: 2 }}
          >
            Create Your First List
          </Button>
        </Paper>
      )}

      {/* Tips section */}
      {tenants.length > 0 && (
        <Paper
          elevation={0}
          sx={{ 
            p: 3, 
            mt: 6,
            mb: 3,
            borderRadius: 4,
            bgcolor: alpha('#4caf50', 0.05),
            border: '1px solid',
            borderColor: alpha('#4caf50', 0.2)
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <RestaurantMenuIcon sx={{ color: '#4caf50', mt: 0.5 }} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2e7d32', mb: 1 }}>
                Pro Tip
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create separate lists for different contexts - one for restaurants in your city, another for food delivery services, 
                or specific cuisines you want to track. This helps organize your ratings more effectively.
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}

      <CreateTenantDialog 
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreateTenant={handleCreateTenant}
      />
    </Container>
  );
};

export default TenantList;