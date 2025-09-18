package com.example.foodratings.model;

public class FoodRequest 
{
    private String food;
    private String cuisine;
    private int rating;

    // Getters and Setters are needed for Spring to process the JSON
    public String getFood() 
    { 
        return food; 
    }
    public void setFood(String food) 
    { 
        this.food = food; 
    }
    public String getCuisine() 
    { 
        return cuisine; 
    }
    public void setCuisine(String cuisine) 
    { 
        this.cuisine = cuisine; 
    }
    public int getRating() 
    { 
        return rating; 
    }
    public void setRating(int rating) 
    { 
        this.rating = rating; 
    }
}