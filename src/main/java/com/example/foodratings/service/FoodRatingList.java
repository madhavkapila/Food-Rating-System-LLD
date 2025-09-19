package com.example.foodratings.service;

import com.example.foodratings.model.Foods;
import java.util.*;

// This class represents a single, independent list of food ratings.
// It is NOT a Spring Service, so we can create many instances of it.
public class FoodRatingList 
{

    private final Map<String, SortedSet<Foods>> rankings = new HashMap<>();
    private final Map<String, Foods> foodsDetails = new HashMap<>();

    public void addFood(String foodName, String cuisine, int rating) 
    {
        if (foodsDetails.containsKey(foodName)) 
        {
            changeRating(foodName, rating);
            return;
        }

        Foods f = new Foods(foodName, cuisine, rating);
        SortedSet<Foods> curr = rankings.getOrDefault(f.cuisine,
            new TreeSet<>((a, b) -> {
                int cmp = Integer.compare(b.rating, a.rating);
                if (cmp != 0) return cmp;
                return a.food.compareTo(b.food);
            })
        );

        curr.add(f);
        rankings.put(f.cuisine, curr);
        foodsDetails.put(f.food, f);
    }

    public void changeRating(String food, int newRating) 
    {
        Foods f = foodsDetails.get(food);
        if (f == null) return;
        SortedSet<Foods> curr = rankings.get(f.cuisine);
        curr.remove(f);
        f.rating = newRating;
        curr.add(f);
    }

    public String getHighestRated(String cuisine) 
    {
        SortedSet<Foods> foodSet = rankings.get(cuisine);
        if (foodSet == null || foodSet.isEmpty()) 
        {
            return "No foods found for this cuisine.";
        }
        return foodSet.first().food;
    }
}