package com.example.foodratings.service;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class FoodRatingsService 
{

    // A map to hold all our different food rating lists.
    // Key: The name of the list (e.g., "ITC-hotel-restaurant", "new-york-foods")
    // Value: An instance of our FoodRatingList class
    private final Map<String, FoodRatingList> ratingLists = new ConcurrentHashMap<>();

    public void createRatingList(String listName) 
    {
        // Creates a new, empty list if one with that name doesn't exist.
        ratingLists.putIfAbsent(listName, new FoodRatingList());
    }

    public FoodRatingList getRatingList(String listName) 
    {
        // Helper to retrieve a specific rating list by its name.
        return ratingLists.get(listName);
    }
}



































// package com.example.foodratings.service;

// import java.util.HashMap;
// import java.util.Map;
// import java.util.SortedSet;
// import java.util.TreeSet;

// import org.springframework.stereotype.Service;

// import com.example.foodratings.model.Foods;

// @Service
// public class FoodRatingsService 
// {
//     private final Map<String, SortedSet<Foods>> rankings = new HashMap<>();
//     private final Map<String, Foods> foodsDetails = new HashMap<>();

//     public void addFood(String foodName, String cuisine, int rating) 
//     {
//         // If the food already exists, treat this as a rating change.

//         // rankings = new HashMap<>();
//         // foodsDetails = new HashMap<>();//Already done above

//         if (foodsDetails.containsKey(foodName))
//         {
//             changeRating(foodName, rating);
//             return;
//         }
        
//         Foods f = new Foods(foodName, cuisine, rating);
        
//         SortedSet<Foods> curr = rankings.getOrDefault(f.cuisine, 
//             new TreeSet<>((a, b) -> {
//                 int cmp = Integer.compare(b.rating, a.rating);
//                 if (cmp != 0) return cmp;
//                 return a.food.compareTo(b.food);
//             })
//         );

//         curr.add(f);
//         rankings.put(f.cuisine, curr);
//         foodsDetails.put(f.food, f);
//     }

    
//     public void changeRating(String food, int newRating) 
//     {
//         Foods f = foodsDetails.get(food);
//         if (f == null) return;

//         SortedSet<Foods> curr = rankings.get(f.cuisine);
        
//         curr.remove(f);
//         f.rating = newRating;
//         curr.add(f);
//     }
    
//     public String highestRated(String cuisine)
//     {
//         SortedSet<Foods> foodSet = rankings.get(cuisine);

//         if (foodSet == null || foodSet.isEmpty()) 
//         {
//             return "No foods found for this cuisine.";
//         }

//         return foodSet.first().food;
//     }

//     // @PostConstruct // Runs after the service is created and ready
//     // public void init() 
//     // {
//     //     rankings = new HashMap<>();
//     //     foodsDetails = new HashMap<>();
        
//     //     String[] foods = {"kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"};
//     //     String[] cuisines = {"korean", "japanese", "japanese", "greek", "japanese", "korean"};
//     //     int[] ratings = {9, 12, 8, 15, 14, 7};

//     //     int n = foods.length;
//     //     for (int i = 0; i < n; i++) 
//     //     {
//     //         Foods f = new Foods(foods[i], cuisines[i], ratings[i]);
            
//     //         SortedSet<Foods> curr = rankings.getOrDefault(f.cuisine, 
//     //             new TreeSet<>((a, b) -> {
//     //                 int cmp = Integer.compare(b.rating, a.rating);
//     //                 if (cmp != 0) return cmp;
//     //                 return a.food.compareTo(b.food);
//     //             })
//     //         );

//     //         curr.add(f);
//     //         rankings.put(f.cuisine, curr);
//     //         foodsDetails.put(f.food, f);
//     //     }
//     // }
// }