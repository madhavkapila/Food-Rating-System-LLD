import axios from 'axios';

const API_URL = '/api/v1/lists';

// Service for interacting with the food ratings API
const foodRatingsService = {
  // Get all tenant list names
  getAllTenants: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching tenants:', error);
      throw error;
    }
  },

  // Create a new tenant (food rating list)
  createTenant: async (tenantName) => {
    try {
      const response = await axios.post(`${API_URL}/${tenantName}`);
      return response.data;
    } catch (error) {
      console.error(`Error creating tenant ${tenantName}:`, error);
      throw error;
    }
  },

  // Add a food item to a tenant's list
  addFood: async (tenantName, foodData) => {
    try {
      const response = await axios.post(`${API_URL}/${tenantName}/foods`, foodData);
      return response.data;
    } catch (error) {
      console.error(`Error adding food to ${tenantName}:`, error);
      throw error;
    }
  },

  // Get the highest-rated food for a specific cuisine
  getHighestRated: async (tenantName, cuisineName) => {
    try {
      const response = await axios.get(`${API_URL}/${tenantName}/cuisines/${cuisineName}/highest-rated`);
      return response.data;
    } catch (error) {
      console.error(`Error getting highest rated food for ${cuisineName} in ${tenantName}:`, error);
      throw error;
    }
  },

  // Update the rating of a food item
  changeRating: async (tenantName, foodName, newRating) => {
    try {
      const response = await axios.post(`${API_URL}/${tenantName}/foods/${foodName}/rate`, {
        rating: newRating
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating rating for ${foodName} in ${tenantName}:`, error);
      throw error;
    }
  }
};

export default foodRatingsService;