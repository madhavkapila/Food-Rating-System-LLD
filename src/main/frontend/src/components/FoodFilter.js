import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import TuneIcon from '@mui/icons-material/Tune';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import { alpha, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

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

// Component for filtering foods by cuisine and rating
const FoodFilter = ({ cuisines, minRating, onCuisineChange, onMinRatingChange, onSearchTermChange, selectedCuisines }) => {
  const theme = useTheme();

  const handleCuisineChange = (event) => {
    const {
      target: { value },
    } = event;
    onCuisineChange(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleRatingChange = (event, newValue) => {
    onMinRatingChange(newValue);
  };

  const handleSearchChange = (event) => {
    onSearchTermChange(event.target.value);
  };

  return (
    <Paper 
      elevation={2}
      sx={{ 
        p: 3, 
        mb: 4,
        borderRadius: 3,
        background: `linear-gradient(to right bottom, ${alpha('#fff', 0.95)}, ${alpha('#fff', 0.95)}),
                    linear-gradient(to right bottom, ${alpha('#ff9800', 0.05)}, ${alpha('#f44336', 0.05)})`
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
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            p: 1,
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FilterAltIcon sx={{ color: 'primary.main' }} />
        </Box>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700,
            fontFamily: 'Playfair Display, serif',
          }}
        >
          Filter Your Food Collection
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        gap: 3,
        alignItems: { xs: 'stretch', md: 'flex-end' }
      }}>
        <FormControl sx={{ flex: 1.5, minWidth: 200 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mb: 1 
          }}>
            <MenuBookIcon sx={{ fontSize: 20, color: 'primary.main', mr: 1 }} />
            <Typography variant="subtitle2" fontWeight={600}>
              Cuisine Type
            </Typography>
          </Box>
          
          <Select
            multiple
            value={selectedCuisines}
            onChange={handleCuisineChange}
            input={<OutlinedInput placeholder="Select cuisines" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7 }}>
                {selected.map((value) => (
                  <Chip 
                    key={value} 
                    label={value}
                    size="small"
                    sx={{ 
                      fontWeight: 500,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: 'primary.main',
                      borderRadius: 1.5,
                    }}
                    icon={
                      <Typography 
                        component="span" 
                        sx={{ ml: 1, fontSize: '0.875rem', lineHeight: 1 }}
                      >
                        {getCuisineIcon(value)}
                      </Typography>
                    }
                  />
                ))}
                {selected.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    All cuisines
                  </Typography>
                )}
              </Box>
            )}
            MenuProps={{
              PaperProps: {
                elevation: 4,
                sx: {
                  maxHeight: 48 * 4.5 + 8,
                  mt: 1,
                  borderRadius: 2,
                },
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          >
            {cuisines.map((cuisine) => (
              <MenuItem
                key={cuisine}
                value={cuisine}
                sx={{
                  fontWeight:
                    selectedCuisines.indexOf(cuisine) === -1
                      ? theme.typography.fontWeightRegular
                      : theme.typography.fontWeightMedium,
                }}
              >
                <Box sx={{ mr: 1 }}>
                  {getCuisineIcon(cuisine)}
                </Box>
                {cuisine}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mb: 1 
          }}>
            <StarIcon sx={{ fontSize: 20, color: 'primary.main', mr: 1 }} />
            <Typography variant="subtitle2" fontWeight={600}>
              Minimum Rating: {minRating}/20
            </Typography>
          </Box>
          
          <Box sx={{ px: 1 }}>
            <Slider
              value={minRating}
              onChange={handleRatingChange}
              aria-labelledby="minimum-rating-slider"
              valueLabelDisplay="auto"
              step={1}
              marks={[
                { value: 0, label: '0' },
                { value: 10, label: '10' },
                { value: 20, label: '20' }
              ]}
              min={0}
              max={20}
              sx={{
                color: 'primary.main',
                '& .MuiSlider-thumb': {
                  height: 20,
                  width: 20,
                  backgroundColor: '#fff',
                  border: '2px solid currentColor',
                  '&:hover, &.Mui-active': {
                    boxShadow: '0 0 0 8px rgba(255, 152, 0, 0.16)',
                  },
                },
                '& .MuiSlider-rail': {
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: alpha('#ff9800', 0.2),
                },
                '& .MuiSlider-track': {
                  height: 6,
                  borderRadius: 3,
                },
              }}
            />
          </Box>
        </Box>
        
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mb: 1 
          }}>
            <SearchIcon sx={{ fontSize: 20, color: 'primary.main', mr: 1 }} />
            <Typography variant="subtitle2" fontWeight={600}>
              Search Foods
            </Typography>
          </Box>
          
          <TextField 
            placeholder="Search by food name..." 
            variant="outlined"
            fullWidth
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
        </Box>
      </Box>
      
      {selectedCuisines.length > 0 || minRating > 0 ? (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mt: 2.5,
          pt: 2,
          borderTop: '1px dashed',
          borderColor: 'divider'
        }}>
          <TuneIcon sx={{ color: 'primary.main', mr: 1, fontSize: 20 }} />
          <Typography variant="body2" color="text.secondary">
            <strong>Active filters:</strong> {selectedCuisines.length > 0 ? `${selectedCuisines.length} cuisine${selectedCuisines.length > 1 ? 's' : ''}` : ''} 
            {selectedCuisines.length > 0 && minRating > 0 ? ' and ' : ''}
            {minRating > 0 ? `minimum rating of ${minRating}` : ''}
          </Typography>
        </Box>
      ) : null}
    </Paper>
  );
};

export default FoodFilter;