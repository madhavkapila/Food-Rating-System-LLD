# Food Rating System (LLD Project)

![Java](https://img.shields.io/badge/Java-17-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green)
![React](https://img.shields.io/badge/React-18-blueviolet)

This project is a practical application of Low-Level Design (LLD) principles, starting from the LeetCode "Food Rating System" problem. It has been evolved into a full-stack application featuring a high-performance in-memory rating engine, a REST API built with Java & Spring Boot, and a dynamic React frontend.

The architecture is designed to support multiple, independent rating lists (which we call "tenants"), making it a flexible, multi-tenant system suitable for tracking ratings for different restaurants, cities, or events.

## Features

* **Multi-Tenancy:** Create and manage multiple, independent food rating lists (e.g., "Pizza-Palace-Menu", "New-York-Street-Food").
* **Dynamic Data Management:** Add new foods with cuisines and ratings to any list.
* **Efficient Updates:** Instantly update the rating of an existing food.
* **High-Speed Queries:** Immediately retrieve the highest-rated food for any cuisine within a specific list.

## Core LLD Implementation

The backend service is architected to maintain the high performance of the original LeetCode solution while supporting a real-world application.

The `RatingListManagerService` holds a map of `FoodRatingList` objects. Each `FoodRatingList` object is a self-contained, in-memory rating engine for a single tenant, using two key data structures for optimal performance:

1.  **`HashMap<String, Foods>`**: This provides **O(1)** average time complexity for all direct lookups and updates of a specific food by its name.
2.  **`TreeSet<Foods>`**: This `SortedSet` uses a custom comparator to keep all foods automatically sorted by rating (descending) and then name (ascending). This guarantees:
    * **O(1)** time to find the highest-rated food.
    * **O(log N)** time for additions and removals, which is crucial for the efficiency of the `addFood` and `changeRating` operations.

This hybrid approach ensures that all core operations are extremely fast, as they happen in memory, with the future goal of persisting changes to a database.

## API Endpoints

| Method | Endpoint                                                       | Body (JSON)                                            | Description                                                  |
|--------|----------------------------------------------------------------|--------------------------------------------------------|--------------------------------------------------------------|
| `POST` | `/api/v1/lists/{listName}`                                     | (None)                                                 | Creates a new, empty food rating list.                       |
| `GET`  | `/api/v1/lists`                                                | (None)                                                 | Retrieves the names of all created lists.                    |
| `POST` | `/api/v1/lists/{listName}/foods`                               | `{ "food": "sushi", "cuisine": "japanese", "rating": 10 }` | Adds a new food to the specified list.                       |
| `POST` | `/api/v1/lists/{listName}/foods/{foodName}/rate`               | `{ "rating": 12 }`                                     | Updates the rating of a food in the specified list.          |
| `GET`  | `/api/v1/lists/{listName}/cuisines/{cuisineName}/highest-rated`| (None)                                                 | Gets the highest-rated food for a cuisine in a specific list.|

## Running the Application

### Prerequisites

- Java 17 or higher
- Apache Maven
- Node.js and npm

### Backend Setup

```bash
# From the project's root directory
./mvnw spring-boot:run
```
The backend will start on `http://localhost:8080`.

### Frontend Setup

*(Assuming a standard Create React App setup in a `frontend` folder)*
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
```
The frontend will be accessible at `http://localhost:3000`.

## Future Roadmap

-   **Database Persistence:** Integrate the planned SQL schema using Spring Data JPA to save all data permanently.
-   **Professional Error Handling:** Implement a global exception handler (`@ControllerAdvice`) for robust and consistent API error responses.
-   **User Authentication:** Secure the API with Spring Security to manage user access to different rating lists.
-   **Advanced Queries:** Add more complex API endpoints, such as finding the top N foods or getting average ratings.
-   **Asynchronous Operations:** Make database writes asynchronous (`@Async`) to improve API response times.
