# vishwaaitask 
1. Backend – Golang API Implementation
Setup: I began by setting up the backend in Golang using the Gin framework. This allowed me to handle routing and request management efficiently.

API Endpoints:

- GET /tasks: I implemented a handler function to fetch all tasks from the database. The function used gorm.DB.Find() to retrieve tasks and return them in a JSON response.

- POST /tasks: I created a function that validates incoming task data (title, description, status, and due date) using Go's built-in validation. If validation failed, the API responded with a 400 status and error message. If the data was valid, I used gorm.DB.Create() to insert the new task into the database.

 -  PUT /tasks/{id}: The update functionality involved finding the task by ID using gorm.DB.First(), and then updating the task fields with the new data. If the task didn’t exist, the API would respond with a 404 error.

- DELETE /tasks/{id}: To delete a task, I used gorm.DB.Delete() to remove the task from the database, ensuring proper error handling in case the task wasn’t found.

- Error Handling: I implemented comprehensive error handling by checking for common failure points, such as invalid input or task not found, and responded with appropriate HTTP status codes (e.g., 400, 404, 500).

Modularity: The code was split into separate packages:

Routes: Defined the API routes and linked them to corresponding handlers.

Handlers: Contained the logic for each endpoint (creating, updating, deleting tasks).

Models: Defined the structure of the Task model, including the schema for the database.

Services: Contained any reusable logic, such as database queries, to keep the codebase modular.

Database Integration: I used GORM for ORM-based database access. I created a Task model with fields like id, title, description, status, and due_date. A SQL migration script was written to create the necessary table structure in the database.

2. Frontend – React UI Implementation
Setup: I initialized a React project using Create React App and created the necessary components to build the user interface.

Components:

TaskForm: This component allowed users to create new tasks. It included input fields for title, description, status, and due_date, with proper form validation to ensure all required fields were filled.

TaskList: This component displayed all tasks retrieved from the backend. It displayed each task's title, description, status, and due date, and included options to edit or delete tasks.

TaskEdit: A separate edit form allowed users to modify a task’s information. It pre-filled the fields with existing task data and allowed users to update the task.

State Management: I used React hooks (useState, useEffect) to manage state and handle side effects:

useState was used to manage form inputs and task data.

useEffect was used to fetch tasks from the backend when the component mounted and to re-fetch the task list after creating, updating, or deleting tasks.

API Integration: I used Axios for making HTTP requests to the backend API:

GET request to retrieve all tasks and populate the task list.

POST request to create new tasks.

PUT request to update tasks.

DELETE request to remove tasks.
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Further Enhancements: 

- Make the UI mobile-friendly using CSS media queries and responsive layout components.
- Give updates to users and notifications for task that needs to be done
- Provide dark and light modes 

