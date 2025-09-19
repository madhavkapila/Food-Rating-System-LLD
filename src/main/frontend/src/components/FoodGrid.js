import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import FoodCard from './FoodCard';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
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

// Component for displaying a grid of food items
const FoodGrid = ({ foods, title }) => {
  if (!foods || foods.length === 0) {
    return (
      <Paper 
        elevation={0}
        sx={{ 
          p: 5, 
          textAlign: 'center', 
          mt: 2,
          borderRadius: 4,
          bgcolor: alpha('#f5f5f5', 0.6),
          border: '1px dashed',
          borderColor: 'divider'
        }}
      >
        <SearchOffIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.7 }} />
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          No Foods Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
          There are no foods matching your criteria. Try adjusting your filters or adding new foods to your collection.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      {title && (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <RestaurantMenuIcon sx={{ fontSize: 28, color: 'primary.main' }} />
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                fontFamily: 'Playfair Display, serif',
              }}
            >
              {title}
            </Typography>
          </Box>
          <Divider sx={{ mt: 1, mb: 3 }} />
        </Box>
      )}
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          {foods.map((food, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={`${food.food}-${index}`}
              component={motion.div}
              variants={itemVariants}
            >
              <FoodCard food={food} />
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default FoodGrid;