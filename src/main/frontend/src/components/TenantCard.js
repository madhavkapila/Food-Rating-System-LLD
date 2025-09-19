import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

// Array of food icons for random selection
const foodIcons = [
  '🍕', '🍔', '🍣', '🍜', '🍝', '🍱', '🍛', '🍲', '🍤', '🥗',
  '🌮', '🌯', '🥘', '🥙', '🍗', '🍖', '🍠', '🍞', '🥐', '🥪'
];

// Get random items from the array
const getRandomItems = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Generate background pattern based on tenant name
const getTenantBackground = (tenant) => {
  // Create a deterministic hash from the tenant name
  let hash = 0;
  for (let i = 0; i < tenant.length; i++) {
    hash = tenant.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Use the hash to pick a color hue
  const hue = hash % 360;
  return {
    primary: `hsl(${hue}, 70%, 50%)`,
    light: `hsl(${hue}, 70%, 95%)`,
    medium: `hsl(${hue}, 60%, 85%)`,
    gradient: `linear-gradient(135deg, hsl(${hue}, 70%, 95%) 0%, hsl(${hue}, 60%, 90%) 100%)`
  };
};

// Component for displaying tenant information in a card
const TenantCard = ({ tenant }) => {
  // Generate background colors based on tenant name
  const tenantColors = getTenantBackground(tenant);
  
  // Get random food icons
  const foodEmojis = getRandomItems(foodIcons, 3);

  return (
    <Card 
      elevation={3}
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        transition: 'all 0.3s ease', 
        '&:hover': { 
          transform: 'translateY(-6px)', 
          boxShadow: '0 12px 20px -10px rgba(0,0,0,0.2)'
        }
      }}
    >
      <Box
        sx={{
          height: 120,
          position: 'relative',
          background: tenantColors.gradient,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Background pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.4,
            background: `
              radial-gradient(circle at 20% 30%, ${alpha(tenantColors.primary, 0.2)} 0%, transparent 12%),
              radial-gradient(circle at 60% 70%, ${alpha(tenantColors.primary, 0.2)} 0%, transparent 20%),
              radial-gradient(circle at 90% 10%, ${alpha(tenantColors.primary, 0.2)} 0%, transparent 15%)
            `
          }}
        />
        
        {/* Icon */}
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: alpha(tenantColors.primary, 0.15),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2
          }}
        >
          <StorefrontIcon sx={{ fontSize: 32, color: tenantColors.primary }} />
        </Box>
        
        {/* Food emojis decorations */}
        {foodEmojis.map((emoji, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              fontSize: '1.8rem',
              opacity: 0.5,
              top: `${20 + (index * 30)}%`,
              left: `${15 + (index * 30)}%`,
              transform: `rotate(${index * 12}deg)`,
            }}
          >
            {emoji}
          </Box>
        ))}
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              fontWeight: 700,
              fontFamily: 'Playfair Display, serif',
              color: 'text.primary',
              mb: 0.5
            }}
          >
            {tenant}
          </Typography>
          
          <Chip 
            size="small" 
            label="Active" 
            sx={{ 
              bgcolor: alpha(tenantColors.primary, 0.1),
              color: tenantColors.primary,
              fontWeight: 600,
              fontSize: '0.75rem'
            }} 
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          A curated collection of rated foods from {tenant}
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 1.5, 
          mb: 2,
          flexWrap: 'wrap'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            px: 1.5, 
            py: 0.5,
            bgcolor: alpha('#f5f5f5', 0.7),
            borderRadius: 2
          }}>
            <RestaurantIcon sx={{ fontSize: 16, mr: 0.7, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
              10 Foods
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            px: 1.5, 
            py: 0.5,
            bgcolor: alpha('#f5f5f5', 0.7),
            borderRadius: 2
          }}>
            <RestaurantMenuIcon sx={{ fontSize: 16, mr: 0.7, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
              5 Cuisines
            </Typography>
          </Box>
        </Box>
      </CardContent>
      
      <Divider />
      
      <CardActions sx={{ p: 2.5 }}>
        <Button 
          fullWidth
          component={RouterLink} 
          to={`/tenants/${encodeURIComponent(tenant)}`}
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          sx={{ 
            py: 1,
            fontWeight: 600,
            borderRadius: 2,
            bgcolor: tenantColors.primary,
            '&:hover': {
              bgcolor: alpha(tenantColors.primary, 0.9),
            }
          }}
        >
          View Foods
        </Button>
      </CardActions>
    </Card>
  );
};

export default TenantCard;