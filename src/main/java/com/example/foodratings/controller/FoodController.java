package com.example.foodratings.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.foodratings.model.FoodRequest;
import com.example.foodratings.service.FoodRatingList;
import com.example.foodratings.service.FoodRatingsService;

@RestController
@RequestMapping("/api/v1/lists")
public class FoodController 
{

    private final FoodRatingsService listService;

    @Autowired
    public FoodController(FoodRatingsService listService) 
    {
        this.listService = listService;
    }

    @PostMapping("/{listName}")
    public ResponseEntity<String> createList(@PathVariable String listName) 
    {
        listService.createRatingList(listName);
        return ResponseEntity.ok("List '" + listName + "' created.");
    }

    // --- NEW Endpoint to add a food ---
    // Example: POST http://localhost:8080/api/foods
    @PostMapping("/{listName}/foods")
    public ResponseEntity<String> addFoodToList(@PathVariable String listName, @RequestBody FoodRequest request) 
    {
        FoodRatingList list = listService.getRatingList(listName);
        if (list == null) return ResponseEntity.status(404).body("List not found.");

        list.addFood(request.getFood(), request.getCuisine(), request.getRating());
        return ResponseEntity.ok("Food added to list '" + listName + "'.");
    }

    @GetMapping("/{listName}/cuisines/{cuisineName}/highest-rated")
    public String getHighestRated(@PathVariable String listName, @PathVariable String cuisineName) 
    {
        FoodRatingList list = listService.getRatingList(listName);
        if (list == null) return "List not found.";

        return list.getHighestRated(cuisineName);
    }

    @PostMapping("/{listName}/foods/{foodName}/rate")
    public ResponseEntity<String> changeRating(@PathVariable String listName, @PathVariable String foodName, @RequestBody FoodRequest request) 
    {
        FoodRatingList list = listService.getRatingList(listName);
        if (list == null) return ResponseEntity.status(404).body("List not found.");

        list.changeRating(foodName, request.getRating());
        return ResponseEntity.ok("Rating updated in list '" + listName + "'.");
    }
}