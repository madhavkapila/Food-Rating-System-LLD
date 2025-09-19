import AddCircleIcon from '@mui/icons-material/AddCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import AddFoodDialog from '../components/AddFoodDialog';
import FoodFilter from '../components/FoodFilter';
import FoodGrid from '../components/FoodGrid';
import { mockFoods, mockHighestRated } from '../services/mockData';

// Get cuisine icon based on cuisine name
const getCuisineIcon = (cuisine) => {
  // Map of cuisine to emoji
  const cuisineToEmoji = {
    'Italian': '🍝',
    'Chinese': '🥡',
    'Japanese': '🍣',
    'Mexican': '🌮',
    'Indian': '🍛',
    'Thai': '🍜',
    'French': '🥐',
    'Greek': '🥙',
    'American': '🍔',
    'Korean': '🍲',
    'Mediterranean': '🫒',
    'Vietnamese': '🍲',
    'Turkish': '🥙'
  };

  // Return the emoji if exists, or a default one
  return cuisineToEmoji[cuisine] || '🍽️';
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
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

const TenantDetails = () => {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [highestRated, setHighestRated] = useState({});
  
  const decodedTenantId = decodeURIComponent(tenantId);
  
  useEffect(() => {
    // For demo, we're using mock data
    // In a real implementation, you'd fetch foods for this tenant from the backend
    try {
      setLoading(true);
      const tenantFoods = mockFoods[tenantId] || [];
      setFoods(tenantFoods);
      
      // Extract unique cuisines
      const uniqueCuisines = [...new Set(tenantFoods.map(food => food.cuisine))];
      setCuisines(uniqueCuisines);
      
      // Get highest rated by cuisine
      const highestRatedMap = {};
      uniqueCuisines.forEach(cuisine => {
        try {
          // In a real implementation, this would be an API call
          // const highestRatedFood = await foodRatingsService.getHighestRated(tenantId, cuisine);
          const mockHighest = mockHighestRated[cuisine]?.[tenantId];
          if (mockHighest) {
            highestRatedMap[cuisine] = mockHighest;
          }
        } catch (err) {
          console.error(`Failed to get highest rated for ${cuisine}:`, err);
        }
      });
      
      setHighestRated(highestRatedMap);
      setError(null);
    } catch (err) {
      console.error('Failed to load tenant details:', err);
      setError('Could not load food data. Showing demo data instead.');
      setFoods([]);
    } finally {
      setLoading(false);
    }
  }, [tenantId]);

  // Apply filters whenever filter criteria change
  useEffect(() => {
    let result = [...foods];
    
    // Filter by selected cuisines
    if (selectedCuisines.length > 0) {
      result = result.filter(food => selectedCuisines.includes(food.cuisine));
    }
    
    // Filter by minimum rating
    if (minRating > 0) {
      result = result.filter(food => food.rating >= minRating);
    }
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(food => 
        food.food.toLowerCase().includes(term) || 
        food.cuisine.toLowerCase().includes(term)
      );
    }
    
    setFilteredFoods(result);
  }, [foods, selectedCuisines, minRating, searchTerm]);

  const handleAddFood = async (foodData) => {
    try {
      // In a real implementation, this would call the API
      // await foodRatingsService.addFood(tenantId, foodData);
      
      // For demo purposes, add the food locally
      const newFoods = [...foods, foodData];
      setFoods(newFoods);
      
      // Update cuisines if a new cuisine is added
      if (!cuisines.includes(foodData.cuisine)) {
        setCuisines([...cuisines, foodData.cuisine]);
      }
    } catch (err) {
      console.error('Failed to add food:', err);
    }
  };

  return (
    <Container maxWidth="lg">
      {/* Breadcrumbs navigation */}
      <Breadcrumbs 
        aria-label="breadcrumb" 
        sx={{ 
          mt: 2, 
          mb: 3,
          '& a': {
            textDecoration: 'none',
            color: 'text.secondary',
            fontWeight: 500,
            '&:hover': {
              color: 'primary.main',
              textDecoration: 'underline',
            }
          }
        }}
      >
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/tenants">Food Rating Lists</RouterLink>
        <Typography color="text.primary" fontWeight={600}>
          {decodedTenantId}
        </Typography>
      </Breadcrumbs>

      {/* Header section */}
      <Paper
        elevation={0}
        sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: 4,
          backgroundImage: `linear-gradient(135deg, ${alpha('#ff9800', 0.05)} 0%, ${alpha('#f44336', 0.1)} 100%)`,
          border: '1px solid',
          borderColor: alpha('#ff9800', 0.1),
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box
            sx={{
              p: 1.5,
              bgcolor: alpha('#ff9800', 0.1),
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <StorefrontIcon sx={{ fontSize: 36, color: 'primary.main' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 700, 
                mb: 1,
                fontFamily: 'Playfair Display, serif',
              }}
            >
              {decodedTenantId}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Explore and manage food ratings for {decodedTenantId}
            </Typography>
            
            <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip 
                icon={<RestaurantMenuIcon />} 
                label={`${foods.length} Foods`} 
                size="medium" 
                sx={{ fontWeight: 500 }}
              />
              <Chip 
                icon={<StorefrontIcon />} 
                label={`${cuisines.length} Cuisines`} 
                size="medium"
                color="primary"
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
            </Box>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<AddCircleIcon />}
            onClick={() => setDialogOpen(true)}
            size="large"
            sx={{ 
              fontWeight: 600, 
              borderRadius: 2,
              px: 3,
              py: 1.2,
              alignSelf: 'flex-start',
              boxShadow: '0 4px 12px rgba(255, 152, 0, 0.2)'
            }}
          >
            Add New Food
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
            Loading foods for {decodedTenantId}...
          </Typography>
        </Box>
      ) : (
        <>
          <FoodFilter 
            cuisines={cuisines}
            selectedCuisines={selectedCuisines}
            minRating={minRating}
            onCuisineChange={setSelectedCuisines}
            onMinRatingChange={setMinRating}
            onSearchTermChange={setSearchTerm}
          />

          {Object.keys(highestRated).length > 0 && (
            <Paper 
              elevation={2}
              sx={{ 
                p: 3, 
                mb: 4,
                borderRadius: 3,
                background: `linear-gradient(to right bottom, ${alpha('#fff', 0.95)}, ${alpha('#fff', 0.95)}),
                           linear-gradient(to right bottom, ${alpha('#f5c71a', 0.05)}, ${alpha('#d1a000', 0.1)})`
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 3,
                gap: 2
              }}>
                <Box
                  sx={{
                    bgcolor: alpha('#f5c71a', 0.1),
                    p: 1,
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <EmojiEventsIcon sx={{ color: '#d4ac16' }} />
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700,
                    fontFamily: 'Playfair Display, serif',
                  }}
                >
                  Top-Rated Foods by Cuisine
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 3 }} />
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {Object.entries(highestRated).map(([cuisine, food]) => (
                    <motion.div key={cuisine} variants={itemVariants}>
                      <Paper
                        elevation={0}
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center', 
                          gap: 1,
                          px: 2, 
                          py: 1.2, 
                          borderRadius: 3,
                          bgcolor: alpha('#ffc107', 0.1),
                          border: '1px solid',
                          borderColor: alpha('#ffc107', 0.3),
                        }}
                      >
                        <Typography component="span" sx={{ fontSize: '1.2rem', mr: 0.5 }}>
                          {getCuisineIcon(cuisine)}
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                          {cuisine}:
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 700, 
                            color: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                          }}
                        >
                          <MilitaryTechIcon sx={{ fontSize: 16 }} /> {food}
                        </Typography>
                      </Paper>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Paper>
          )}

          <FoodGrid 
            foods={filteredFoods} 
            title={filteredFoods.length < foods.length ? "Filtered Foods" : "All Foods"} 
          />

          {filteredFoods.length === 0 && foods.length > 0 && (
            <Alert 
              severity="info" 
              sx={{ 
                mt: 4, 
                py: 2,
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  fontSize: '1.5rem'
                }
              }}
            >
              No foods match your current filters. Try adjusting your search criteria.
            </Alert>
          )}

          <AddFoodDialog 
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onAddFood={handleAddFood}
          />
        </>
      )}
    </Container>
  );
};

export default TenantDetails;