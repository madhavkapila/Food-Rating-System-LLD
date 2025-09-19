import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import { alpha, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

// Sample suggestions for tenant names
const suggestions = [
  'Italian Restaurants',
  'Asian Cuisine',
  'Favorite Pizzerias',
  'Downtown Food Spots',
  'Street Food Vendors',
  'Brunch Places'
];

// Component for creating a new rating list (tenant)
const CreateTenantDialog = ({ open, onClose, onCreateTenant }) => {
  const theme = useTheme();
  const [tenantName, setTenantName] = useState('');
  const [error, setError] = useState('');

  const handleCreate = () => {
    if (!tenantName || tenantName.trim() === '') {
      setError('List name cannot be empty');
      return;
    }
    
    onCreateTenant(tenantName);
    setTenantName('');
    setError('');
    onClose();
  };

  const handleSuggestionClick = (suggestion) => {
    setTenantName(suggestion);
    setError('');
  };

  const handleClose = () => {
    setTenantName('');
    setError('');
    onClose();
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
        bgcolor: 'primary.main', 
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
          Create New Food Rating List
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

      <DialogContent sx={{ pt: 3, pb: 1 }}>
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
            <FormatListBulletedIcon sx={{ fontSize: 24, color: 'primary.main' }} />
          </Box>
          <DialogContentText sx={{ flex: 1, m: 0 }}>
            Enter a name for your new food rating list. This could be a restaurant name, city, cuisine type, or any other way you'd like to organize your ratings.
          </DialogContentText>
        </Box>

        <TextField
          autoFocus
          margin="dense"
          label="List Name"
          type="text"
          fullWidth
          variant="outlined"
          value={tenantName}
          onChange={(e) => {
            setTenantName(e.target.value);
            if (e.target.value.trim() !== '') {
              setError('');
            }
          }}
          error={!!error}
          helperText={error}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <StorefrontIcon color="primary" />
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

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
            Suggestions:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {suggestions.map((suggestion) => (
              <Paper
                key={suggestion}
                elevation={0}
                onClick={() => handleSuggestionClick(suggestion)}
                sx={{ 
                  px: 1.5, 
                  py: 0.7, 
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  color: 'text.primary',
                  border: '1px solid',
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                  }
                }}
              >
                {suggestion}
              </Paper>
            ))}
          </Box>
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
          onClick={handleCreate} 
          variant="contained"
          startIcon={<CreateIcon />}
          sx={{ 
            px: 3,
            py: 1,
            fontWeight: 600,
            borderRadius: 2
          }}
        >
          Create List
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTenantDialog;