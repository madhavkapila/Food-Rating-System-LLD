import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import { alpha, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

// Custom styled rating component with food icons
const FoodRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#BF4904',
  },
  '& .MuiRating-iconHover': {
    color: '#f9683a',
  },
});

// Get a random food image based on cuisine
const getFoodImage = (cuisine) => {
  const cuisineImageMap = {
    'indian': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=60', // Vegetarian curry and rice
    'italian': 'https://images.unsplash.com/photo-1627042633145-b780d842ba0a?auto=format&fit=crop&w=600&q=60', // Margherita pizza
    'chinese': 'https://images.unsplash.com/photo-1625870605450-90d634bdadb1?auto=format&fit=crop&w=600&q=60', // Vegetable spring rolls
    'japanese': 'https://images.unsplash.com/photo-1618889482923-38250401a84e?auto=format&fit=crop&w=600&q=60', // Vegetable sushi rolls
    'mexican': 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=600&q=60', // Guacamole and chips
    'thai': 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?auto=format&fit=crop&w=600&q=60', // Pad thai vegetable
    'french': 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=600&q=60', // French pastries
    'korean': 'https://images.unsplash.com/photo-1583224874284-c5f358da84c8?auto=format&fit=crop&w=600&q=60', // Vegetable bibimbap
    'mediterranean': 'https://images.unsplash.com/photo-1544598740-a20dca5e0ad1?auto=format&fit=crop&w=600&q=60', // Hummus and pita
    'american': 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=60', // Vegetable burger
    'greek': 'https://images.unsplash.com/photo-1551326844-4df70f78d0e9?auto=format&fit=crop&w=600&q=60', // Greek salad
  };
  
  const lowerCuisine = cuisine.toLowerCase();
  return cuisineImageMap[lowerCuisine] || 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=60'; // Vegetable salad as fallback
};

// Component for displaying a food item with its cuisine and rating
const FoodCard = ({ food }) => {
  const [favorite, setFavorite] = useState(false);
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setFavorite(!favorite);
  };
  
  return (
    <Card 
      elevation={2}
      sx={{ 
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        borderRadius: 3,
        overflow: 'hidden',
        '&:hover': { 
          transform: 'translateY(-6px)', 
          boxShadow: '0 12px 24px rgba(0,0,0,0.1)' 
        } 
      }}
    >
      <CardActionArea sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="160"
            image={getFoodImage(food.cuisine)}
            alt={food.food}
          />
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              right: 0, 
              p: 1,
              borderRadius: '0 0 0 8px',
              backgroundColor: alpha('#000', 0.5),
            }}
          >
            <IconButton 
              size="small" 
              onClick={handleFavoriteClick}
              sx={{ color: '#ffffff' }}
            >
              {favorite ? <FavoriteIcon sx={{ color: '#ff6b6b' }} /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>
          <Chip 
            label={food.cuisine}
            size="small"
            sx={{ 
              position: 'absolute', 
              bottom: 12, 
              left: 12,
              backgroundColor: alpha('#000', 0.6),
              color: '#ffffff',
              fontWeight: 'bold',
              '& .MuiChip-icon': { color: '#ffffff' },
            }}
            icon={<RestaurantIcon sx={{ fontSize: 16 }} />}
          />
        </Box>
      
        <CardContent sx={{ flexGrow: 1, pt: 2, px: 2 }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              mb: 1, 
              fontWeight: 600,
              fontFamily: 'Playfair Display, serif',
            }}
          >
            {food.food}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 1,
          }}>
            <FoodRating
              value={food.rating / 4} 
              precision={0.5}
              readOnly 
              icon={<LocalDiningIcon fontSize="inherit" />}
              emptyIcon={<LocalDiningIcon fontSize="inherit" />}
            />
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.main',
                bgcolor: alpha('#BF4904', 0.1),
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
              }}
            >
              {food.rating}/20
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FoodCard;