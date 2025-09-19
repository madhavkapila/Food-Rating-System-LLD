# Food Rating System (LLD Project)

An implementation of the LeetCode "Food Rating System" problem, enhanced with a Spring Boot backend and React frontend. This project preserves the Low-Level Design (LLD) principles while adding practical features like tenant management and a user interface.

## Project Structure

- **Backend**: Spring Boot REST API that maintains the core LLD data structures
- **Frontend**: React application with Material UI for user interactions
- **Data Model**: Design for future database integration while preserving LLD essence

## Features

- Create multiple independent food rating lists (tenants)
- Add foods with cuisines and ratings to each tenant
- Update food ratings
- Find the highest-rated food for each cuisine
- Filter foods by cuisine, rating, and search terms

## Running the Application

### Prerequisites

- Java 11 or higher
- Maven
- Node.js and npm (for frontend development)

### Backend Setup

```bash
# Navigate to the project directory
cd food-rating-system-lld

# Build and run the Spring Boot application
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`.

### Frontend Development

```bash
# Navigate to the frontend directory
cd src/main/frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
```

The frontend dev server will start on `http://localhost:3000`.

### Building for Production

```bash
# Build the frontend
cd src/main/frontend
npm run build

# This will copy the built frontend to src/main/resources/static/app

# Build the entire application
cd ../../..
mvn clean package
```

The resulting JAR file in the `target` directory will contain both the backend and frontend.

## Core LLD Concepts

The core of this project is the `FoodRatingList` class, which implements:

1. **Data Structures**: 
   - Uses `HashMap` to store food details
   - Uses `TreeSet` (SortedSet) with custom comparator to maintain foods sorted by rating

2. **Operations**:
   - `addFood`: Add a new food with its cuisine and rating
   - `changeRating`: Update the rating of an existing food
   - `getHighestRated`: Find the highest-rated food for a given cuisine

## Future Enhancements

- Database integration (schema design already included)
- User authentication and authorization
- Rating history and trends
- Additional statistics and analytics

## Architecture

This project follows a clean architecture:

- **Model Layer**: Data classes for foods, ratings, etc.
- **Service Layer**: Core business logic with LLD implementation
- **Controller Layer**: REST API endpoints
- **Frontend**: React components and services

The project is designed to ensure the LLD components remain intact even as the application scales.
