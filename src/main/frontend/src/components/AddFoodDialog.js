import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import StarIcon from '@mui/icons-material/Star';
import UpdateIcon from '@mui/icons-material/Update';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Slider from '@mui/material/Slider';
import { alpha, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

// Popular cuisine options for autocomplete
const popularCuisines = [
  'American', 'Chinese', 'French', 'Greek', 'Indian', 
  'Italian', 'Japanese', 'Korean', 'Mediterranean', 
  'Mexican', 'Thai', 'Turkish', 'Vietnamese'
];

// Component for adding or updating food ratings
const AddFoodDialog = ({ open, onClose, onAddFood, initialValues = {} }) => {
  const theme = useTheme();
  const [food, setFood] = useState(initialValues.food || '');
  const [cuisine, setCuisine] = useState(initialValues.cuisine || '');
  const [rating, setRating] = useState(initialValues.rating || 10);
  const [errors, setErrors] = useState({});
  
  const isEditing = !!initialValues.food;

  const validate = () => {
    const newErrors = {};
    
    if (!food.trim()) newErrors.food = 'Food name is required';
    if (!cuisine.trim()) newErrors.cuisine = 'Cuisine is required';
    if (rating === null) newErrors.rating = 'Rating is required';
    else if (isNaN(rating) || rating < 0 || rating > 20) {
      newErrors.rating = 'Rating must be a number between 0 and 20';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onAddFood({
        food: food.trim(),
        cuisine: cuisine.trim(),
        rating: parseInt(rating)
      });
      
      // Reset form if not editing
      if (!isEditing) {
        setFood('');
        setCuisine('');
        setRating(10);
      }
      
      onClose();
    }
  };

  const handleClose = () => {
    // Reset the form when closing
    if (!isEditing) {
      setFood('');
      setCuisine('');
      setRating(10);
    }
    setErrors({});
    onClose();
  };

  const getRatingLabel = (value) => {
    if (value <= 5) return 'Poor';
    if (value <= 10) return 'Average';
    if (value <= 15) return 'Good';
    return 'Excellent';
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        elevation: 24,
        sx: { 
          borderRadius: 3,
          overflow: 'hidden'
        }
      }}
    >
      <Box sx={{ 
        bgcolor: isEditing ? 'primary.dark' : 'primary.main', 
        color: '#ffffff',
        py: 2,
        px: 3,
        position: 'relative'
      }}>
        <DialogTitle sx={{ 
          p: 0, 
          fontWeight: 700,
          fontSize: '1.5rem',
          fontFamily: 'Playfair Display, serif',
        }}>
          {isEditing ? 'Update Food Rating' : 'Add New Food'}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: '#ffffff',
            bgcolor: 'rgba(255,255,255,0.1)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.2)',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box
            sx={{
              mr: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              p: 1.2,
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {isEditing ? (
              <UpdateIcon sx={{ fontSize: 24, color: 'primary.main' }} />
            ) : (
              <FastfoodIcon sx={{ fontSize: 24, color: 'primary.main' }} />
            )}
          </Box>
          <DialogContentText sx={{ flex: 1, m: 0 }}>
            {isEditing 
              ? 'Update the details and rating for this food item'
              : 'Add a new food item to your rating list with details and your rating'
            }
          </DialogContentText>
        </Box>
        
        <TextField
          margin="dense"
          label="Food Name"
          type="text"
          fullWidth
          variant="outlined"
          value={food}
          onChange={(e) => {
            setFood(e.target.value);
            if (e.target.value.trim()) {
              setErrors({...errors, food: undefined});
            }
          }}
          disabled={isEditing}
          error={!!errors.food}
          helperText={errors.food}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FastfoodIcon color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }}
        />
        
        <Autocomplete
          freeSolo
          options={popularCuisines}
          value={cuisine}
          onChange={(event, newValue) => {
            setCuisine(newValue || '');
            if (newValue && newValue.trim()) {
              setErrors({...errors, cuisine: undefined});
            }
          }}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label="Cuisine Type" 
              margin="dense"
              error={!!errors.cuisine}
              helperText={errors.cuisine}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <MenuBookIcon color="primary" />
                    </InputAdornment>
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
            />
          )}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }}
        />
        
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              mb: 1, 
              display: 'flex', 
              alignItems: 'center',
              fontWeight: 600
            }}
          >
            <StarIcon sx={{ color: 'primary.main', mr: 1, fontSize: 20 }} />
            Rating
          </Typography>
          
          <Box sx={{ px: 1 }}>
            <Slider
              value={parseInt(rating)}
              onChange={(e, newValue) => {
                setRating(newValue);
                setErrors({...errors, rating: undefined});
              }}
              min={0}
              max={20}
              marks={[
                { value: 0, label: '0' },
                { value: 5, label: '5' },
                { value: 10, label: '10' },
                { value: 15, label: '15' },
                { value: 20, label: '20' }
              ]}
              valueLabelDisplay="auto"
              sx={{
                color: 'primary.main',
                '& .MuiSlider-thumb': {
                  height: 24,
                  width: 24,
                  backgroundColor: '#fff',
                  border: '2px solid currentColor',
                  '&:hover, &.Mui-active': {
                    boxShadow: '0 0 0 8px rgba(255, 152, 0, 0.16)',
                  },
                },
                '& .MuiSlider-rail': {
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: alpha('#ff9800', 0.2),
                },
                '& .MuiSlider-track': {
                  height: 8,
                  borderRadius: 4,
                },
              }}
            />
            
            <Box sx={{ 
              mt: 2, 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <Typography variant="body2" color="text.secondary">
                Current rating: <strong>{rating}/20</strong>
              </Typography>
              <Box
                sx={{
                  py: 0.5,
                  px: 1.5,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main',
                  fontWeight: 600,
                }}
              >
                {getRatingLabel(rating)}
              </Box>
            </Box>
          </Box>
          
          {errors.rating && (
            <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
              {errors.rating}
            </Typography>
          )}
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button 
          onClick={handleClose}
          sx={{ 
            color: 'text.secondary',
            fontWeight: 600,
            px: 3
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          color={isEditing ? "primary" : "primary"}
          startIcon={isEditing ? <UpdateIcon /> : <AddIcon />}
          sx={{ 
            px: 3,
            py: 1,
            fontWeight: 600,
            borderRadius: 2
          }}
        >
          {isEditing ? 'Update Food' : 'Add Food'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFoodDialog;