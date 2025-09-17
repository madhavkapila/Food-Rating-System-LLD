package com.example.foodratings.controller;

import com.example.foodratings.model.RatingChangeRequest;
import com.example.foodratings.service.FoodRatingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class FoodController 
{

    private final FoodRatingsService foodService;

    @Autowired
    public FoodController(FoodRatingsService foodService) 
    {
        this.foodService = foodService;
    }

    @GetMapping("/highest-rated/{cuisine}")

    public String getHighestRated(@PathVariable String cuisine) {
        return foodService.highestRated(cuisine);
    }

    @PostMapping("/rate/{food}")
    public ResponseEntity<Void> changeFoodRating(@PathVariable String food, @RequestBody RatingChangeRequest request) 
        {
        foodService.changeRating(food, request.getNewRating());
        return ResponseEntity.ok().build();
    }
}