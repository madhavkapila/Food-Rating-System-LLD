package com.example.foodratings.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    /**
     * Forward any non-API requests to the React frontend
     * This allows for client-side routing
     */
    @GetMapping(value = {"/", "/{path:^(?!api|error).*$}/**"})
    public String forwardToReactApp() 
    {
        return "forward:/app/index.html";
    }
}