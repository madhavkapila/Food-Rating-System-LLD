// Mock data for development when the API is not available
export const mockTenants = [
  'ITC Hotel',
  'Taj Restaurant',
  'Delhi Street Food',
  'New York Cuisine',
  'Tokyo Delights'
];

export const mockFoods = {
  'ITC Hotel': [
    { food: 'Butter Chicken', cuisine: 'Indian', rating: 18 },
    { food: 'Pasta Carbonara', cuisine: 'Italian', rating: 16 },
    { food: 'Sushi Platter', cuisine: 'Japanese', rating: 19 },
    { food: 'Tandoori Roti', cuisine: 'Indian', rating: 15 },
    { food: 'Tiramisu', cuisine: 'Italian', rating: 17 }
  ],
  'Taj Restaurant': [
    { food: 'Biryani', cuisine: 'Indian', rating: 19 },
    { food: 'Pad Thai', cuisine: 'Thai', rating: 16 },
    { food: 'Caesar Salad', cuisine: 'American', rating: 14 },
    { food: 'Gulab Jamun', cuisine: 'Indian', rating: 18 }
  ],
  'Delhi Street Food': [
    { food: 'Chole Bhature', cuisine: 'Indian', rating: 19 },
    { food: 'Aloo Tikki', cuisine: 'Indian', rating: 17 },
    { food: 'Golgappa', cuisine: 'Indian', rating: 20 },
    { food: 'Jalebi', cuisine: 'Indian', rating: 18 }
  ],
  'New York Cuisine': [
    { food: 'Cheesecake', cuisine: 'American', rating: 18 },
    { food: 'NY Style Pizza', cuisine: 'American', rating: 19 },
    { food: 'Bagel with Lox', cuisine: 'American', rating: 16 },
    { food: 'Pastrami Sandwich', cuisine: 'American', rating: 17 }
  ],
  'Tokyo Delights': [
    { food: 'Ramen', cuisine: 'Japanese', rating: 19 },
    { food: 'Tempura', cuisine: 'Japanese', rating: 17 },
    { food: 'Sushi', cuisine: 'Japanese', rating: 20 },
    { food: 'Matcha Ice Cream', cuisine: 'Japanese', rating: 16 }
  ]
};

export const mockHighestRated = {
  'Indian': {
    'ITC Hotel': 'Butter Chicken',
    'Taj Restaurant': 'Biryani',
    'Delhi Street Food': 'Golgappa'
  },
  'Italian': {
    'ITC Hotel': 'Tiramisu'
  },
  'Japanese': {
    'ITC Hotel': 'Sushi Platter',
    'Tokyo Delights': 'Sushi'
  },
  'American': {
    'Taj Restaurant': 'Caesar Salad',
    'New York Cuisine': 'NY Style Pizza'
  },
  'Thai': {
    'Taj Restaurant': 'Pad Thai'
  }
};