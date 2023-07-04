# Kanban Board

This project is a Kanban Board web application designed to enhance task management and workflow organization for individuals or teams. The Kanban methodology emphasizes visualizing work, limiting work in progress, and optimizing overall productivity. The application provides a user-friendly interface for creating, organizing, and tracking tasks through different stages of completion.

## Getting Started

1. Clone the repository:

git clone https://github.com/DishaGup/kanban-board.git

2. Install dependencies:

### Backend

npm install

### Frontend

cd view <br>
npm install

3. Set up environment variables:

### Backend

Create a `.env` file in the root directory and provide the necessary environment variables:
PORT=8080
MONGODB_URL=your_mongodb_url

4. Start the server:

### Backend - npm run server

### Frontend - npm run start

<hr/>

The frontend server will start running on http://localhost:3000.

The backend server will start running on http://localhost:8080.

## API Endpoints

### <u>User Registration and Login</u>

<ul>
  <li>
    <h3>Register a User</h3>
    <ul>
      <li><strong>Method:</strong> <code>POST</code></li>
      <li><strong>URL:</strong> <code>/user/signup</code></li>
      <li>
        <h4>Request Body</h4>
        <pre>
{
  "email": "dummy@example.com",
  "password": "dummy",
}
        </pre>
      </li>
      <li>
        <h4>Response</h4>
        <ul>
          <li><strong>Status:</strong> <code>201 Created</code></li>
          <li>
            <h5>Body</h5>
            <pre>
{
  "message": "Account created successfully"
}
            </pre>
          </li>
        </ul>
      </li>
    </ul>
  </li>
  <li>
    <h3>Login</h3>
    <ul>
      <li><strong>Method:</strong> <code>POST</code></li>
      <li><strong>URL:</strong> <code>/user/signin</code></li>
      <li>
        <h4>Request Body</h4>
        <pre>
{
  "email": "dummy@gmail.com",
  "password": "dummy"
}
        </pre>
      </li>
      <li>
        <h4>Response</h4>
        <ul>
          <li><strong>Status:</strong> <code>200 OK</code></li>
          <li>
            <h5>Body</h5>
            <pre>
{
  "message": "Login Successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbF90YXNrIjoiZGlzaGFAZ21haWwuY29tIiwiaWF0IjoxNjg4NDcxNDAyfQ.puZbhFn5tVCWbf2sLVGjjvHoLcgfaVR7yg2Uw90U6WI",
  "userD": [
    {
      "_id": "64914f6990708051f1d97c44",
      "email": "disha@gmail.com",
      "password": "$2b$04$E9ekFhatygZmU89srGsmIugQPfb.gZH1KpSmTZEj00GRZUHET0pai"
    }
  ]
}
</pre>
</li>
</ul>
</li>
</ul>

  </li>

 <li>
    <h3>Get All Users Data</h3>
    <ul>
      <li><strong>Method:</strong> <code>GET</code></li>
      <li><strong>URL:</strong> <code>/user</code></li>
      <li>
        <h4>Response</h4>
        <ul>
          <li><strong>Status:</strong> <code>201</code></li>
          <li>
            <h5>Body</h5>
            <pre>
    [
      "users" : {
      "_id": "6497d7ce7ee5dcb7a336181e",
      "email": "admin@gmail.com",
      "password": "$2b$04$caJ8UN.XGpPyyZrFH8paquJcZMe5P8SYLhk3YCNX35E5XxX3lHWo."
    },
    ]
            </pre>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

<br/>
<hr/>

<br/>

### <u>User Data -endpoints for the `userDataRouter`</u>

<ul>
  <li>
    <h3>Get User Data</h3>
    <ul>
      <li><strong>Method:</strong> <code>GET</code></li>
      <li><strong>URL:</strong> <code>/task</code></li>
     
  <li>
    <h4>Headers</h4>
    <pre>
    {
      Authorization: Bearer [token]
      // Other headers
    }
    </pre>
  </li>

   <li>
        <h4>Response</h4>
        <ul>
          <li><strong>Status:</strong> <code>200 OK</code></li>
          <li>
            <h5>Body</h5>
            <pre>
{
  "boards": [
    {
      "_id": "6491573b413b8bf0ee948341",
      "name": "Project Board",
      "owner": "John Doe",
      "tasks": [
        {
          "_id": "649179c726f3c39ea5200b72",
          "title": "Implement User Authentication",
          "description": "Develop the functionality to authenticate users and handle user sessions.",
          "status": "In Progress",
          "subtasks": [
            {
              "_id": "649453e192953198adcb08f9",
              "title": "Create User Model",
              "isCompleted": true
            },
            {
              "_id": "649453ed92953198adcb08fe",
              "title": "Implement Login and Registration APIs",
              "isCompleted": true
            }
          ]
        },
        {
          "_id": "6494546292953198adcb0905",
          "title": "Design Database Schema",
          "description": "Define the structure and relationships of the database tables.",
          "status": "To Do",
          "subtasks": []
        }
      ]
    },
    {
      "_id": "649454a092953198adcb090f",
      "name": "Feature Development",
      "owner": "Jane Smith",
      "tasks": [
        {
          "_id": "649454b992953198adcb0912",
          "title": "Implement Payment Gateway Integration",
          "description": "Integrate a payment gateway service for online transactions.",
          "status": "In Progress",
          "subtasks": [
            {
              "_id": "64959cb8d2a761504f0cb26a",
              "title": "Handle Payment Callbacks",
              "isCompleted": false
            }
          ]
        },
        {
          "_id": "649454bf92953198adcb0916",
          "title": "Optimize Performance",
          "description": "Improve the application's performance and responsiveness.",
          "status": "To Do",
          "subtasks": []
        }
      ]
    }
  ]
}

 </pre>
          </li>
        </ul>
      </li>
    </ul>

  </li>

<li>
  <h3>Add User Data</h3>
  <ul>
    <li><strong>Method:</strong> <code>POST</code></li>
    <li><strong>URL:</strong> <code>task/addboard</code></li>
    <li>
      <h4>Request Body</h4>
      <pre>
{
  "title": { "type": "String", "required": true },
  "tasks": { "type": "Array", "required": true },
  // other keys
}
      </pre>
    </li>
    <li>
      <h4>Headers</h4>
      <pre>
{
  Authorization: Bearer [token]
  // Other headers
}
      </pre>
    </li>
    <li>
      <h4>Response</h4>
      <ul>
        <li><strong>Status:</strong> <code>200 OK</code></li>
        <li>
          <h5>Body</h5>
          <pre>
{
  "board": {
    "_id": "board_id",
    "title": "board_title",
    "tasks": ["task_id1", "task_id2"],
    // other keys
  }
}
          </pre>
        </li>
      </ul>
    </li>
  </ul>
</li>

<li>
  <h3>Delete Board</h3>
  <ul>
    <li><strong>Method:</strong> <code>DELETE</code></li>
    <li><strong>URL:</strong> <code>task/delete/board/:id</code></li>
    <li>
      <h4>URL Parameters</h4>
      <ul>
        <li><strong>id:</strong> The ID of the board to be deleted</li>
      </ul>
    </li>
    <li>
      <h4>Response</h4>
      <ul>
        <li><strong>Status:</strong> <code>201 Created</code></li>
        <li>
          <h5>Body</h5>
          <pre>
{
  "message": "Deleted Successfully"
}
          </pre>
        </li>
      </ul>
    </li>
  </ul>
</li>

<li>
  <h3>Get Board</h3>
  <ul>
    <li><strong>Method:</strong> <code>GET</code></li>
    <li><strong>URL:</strong> <code>task/board/:id</code></li>
    <li>
      <h4>URL Parameters</h4>
      <ul>
        <li><strong>id:</strong> The ID of the board to retrieve</li>
      </ul>
    </li>
    <li>
      <h4>Response</h4>
      <ul>
        <li><strong>Status:</strong> <code>200 OK</code></li>
        <li>
          <h5>Body</h5>
          <pre>
{
  "board": {
    "_id": "board_id",
    "title": "board_title",
    "tasks": [
      {
        "_id": "task_id1",
        "title": "task_title1",
        "subtasks": [
          {
            "_id": "subtask_id1",
            "title": "subtask_title1"
          },
          {
            "_id": "subtask_id2",
            "title": "subtask_title2"
          }
        ]
      },
      {
        "_id": "task_id2",
        "title": "task_title2",
        "subtasks": []
      }
    ]
  }
}
          </pre>
        </li>
      </ul>
    </li>
  </ul>
</li>

<br>

<p>The base URL for all endpoints is <code>/task</code>

<h3>Add Task</h3>

<ul>
  <li>Method: <code>POST</code></li>
  <li>Endpoint: <code>/addtask</code></li>
  <li>Description: Create a new task and associate it with a board.</li>
  <li>Request Body:
    <ul>
      <li><code>boardId</code> (required): ID of the board to associate the task with.</li>
      <li>Other task properties (e.g., <code>title</code>, <code>description</code>, etc.)</li>
    </ul>
  </li>
  <li>Response: JSON object containing the newly created task.</li>
</ul>

<pre>
<code>
Example Request:
POST /task/addtask
{
  "boardId": "board1",
  "title": "Task 1",
  "description": "This is task 1"
}

Example Response:
{
  "task": {
    "_id": "task1",
    "boardId": "board1",
    "title": "Task 1",
    "description": "This is task 1"
  }
}
</code>
</pre>

<h3>Add Subtask</h3>

<ul>
  <li>Method: <code>POST</code></li>
  <li>Endpoint: <code>/addsubtask</code></li>
  <li>Description: Create a new subtask and associate it with a task and board.</li>
  <li>Request Body:
    <ul>
      <li><code>boardId</code> (required): ID of the board associated with the subtask.</li>
      <li><code>taskId</code> (required): ID of the task to associate the subtask with.</li>
      <li>Other subtask properties (e.g., <code>title</code>, <code>description</code>, etc.)</li>
    </ul>
  </li>
  <li>Response: JSON object containing the newly created subtask.</li>
</ul>

<pre>
<code>
Example Request:
POST /task/addsubtask
{
  "boardId": "board1",
  "taskId": "task1",
  "title": "Subtask 1",
  "description": "This is subtask 1"
}

Example Response:
{
  "subtask": {
    "_id": "subtask1",
    "boardId": "board1",
    "taskId": "task1",
    "title": "Subtask 1",
    "description": "This is subtask 1"
  }
}
</code>
</pre>

<h3>Delete Board</h3>

<ul>
  <li>Method: <code>DELETE</code></li>
  <li>Endpoint: <code>/delete/board/:id</code></li>
  <li>Description: Delete a board and all associated tasks and subtasks.</li>
  <li>Request Params:
    <ul>
      <li><code>id</code> (required): ID of the board to delete.</li>
    </ul>
  </li>
  <li>Response: JSON object with a success message.</li>
</ul>

<pre>
<code>
Example Request:
DELETE /task/delete/board/board1

Example Response:
{
  "message": "Board deleted successfully"
}
</code>
</pre>

<h3>Delete Task</h3>

<ul>
  <li>Method: <code>DELETE</code></li>
  <li>Endpoint: <code>/delete/task/:id</code></li>
  <li>Description: Delete a task and all associated subtasks.</li>
  <li>Request Params:
    <ul>
      <li><code>id</code> (required): ID of the task to delete.</li>
    </ul>
  </li>
  <li>Response: JSON object with a success message.</li>
</ul>

<pre>
<code>
Example Request:
DELETE /task/delete/task/task1

Example Response:
{
  "message": "Task deleted successfully"
}
</code>
</pre>

<h3>Update Task Status</h3>

<ul>
  <li>Method: <code>PATCH</code></li>
  <li>Endpoint: <code>/updatetaskstatus/:id</code></li>
  <li>Description: Update the status of a task (e.g., from "Todo" to "Doing").</li>
  <li>Request Params:
    <ul>
      <li><code>id</code> (required): ID of the task to update.</li>
    </ul>
  </li>
  <li>Request Body:
    <ul>
      <li><code>boardId</code> (required): ID of the board associated with the task.</li>
    </ul>
  </li>
  <li>Response: JSON object with a success message.</li>
</ul>

<pre>
<code>
Example Request:
PATCH /task/updatetaskstatus/task1
{
  "boardId": "board1"
}

Example Response:
{
  "msg": "Task status updated successfully"
}
</code>
</pre>

<h3>Update Subtask Completion Status</h3>

<ul>
  <li>Method: <code>PATCH</code></li>
  <li>Endpoint: <code>/updatesubtaskstatus/:id</code></li>
  <li>Description: Update the completion status of a subtask.</li>
  <li>Request Params:
    <ul>
      <li><code>id</code> (required): ID of the subtask to update.</li>
    </ul>
  </li>
  <li>Request Body:
    <ul>
      <li><code>boardId</code> (required): ID of the board associated with the subtask.</li>
      <li><code>taskId</code> (required): ID of the task associated with the subtask.</li>
    </ul>
  </li>
  <li>Response: JSON object with a success message.</li>
</ul>

<pre>
<code>
Example Request:
PATCH /task/updatesubtaskstatus/subtask1
{
  "boardId": "board1",
  "taskId": "task1"
}

Example Response:
{
  "msg": "Subtask status updated successfully"
}
</code>
</pre>

<h2>Error Handling</h2>

<p>If an error occurs during the API requests, the response will contain a JSON object with an <code>error</code> property describing the error.  Errors are handled by returning appropriate status codes and error messages. The API provides meaningful error messages and status codes to help identify and resolve issues.</p>

<pre>
<code>
Example Error Response:
{
  "error": "Board not found"
}
</code>
</pre>



</ul>

<br/>



## Authentication/Authorization

The API uses token-based authentication. Users must provide an access token in the request headers to access protected routes. To include the access token in API requests, include an `Authorization` header with the value `Bearer {access_token}`. Replace `{access_token}` with the actual access token obtained during the login process.

Example of including the access token in the header:

<pre>
 axios
    .post(`${url}/data/user/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
</pre>

---

<br/>



## Technologies Used

Frontend: The frontend of the application is built using React.js, a popular JavaScript library for building user interfaces. Additional libraries and frameworks such as Redux or Context API may be utilized for state management.

Backend: The backend is implemented using Node.js and Express.js, providing a robust and scalable server-side infrastructure. APIs are designed and endpoints are created to handle data storage, retrieval, and task management.

Database: MongoDB, a NoSQL database, is used to store task-related data such as task details, user information, and project settings. Mongoose, an Object Data Modeling (ODM) library for MongoDB, may be employed to facilitate database operations.

Authentication and Security: User authentication and authorization can be implemented using technologies like JSON Web Tokens (JWT) or session-based authentication. Proper security measures, such as input validation and hashing of password, are applied to protect user data.

## Dependencies

- **@chakra-ui/react**: UI component library based on the Chakra UI system.
- **axios**: Promise-based HTTP client for making API requests.
- **react**: JavaScript library for building user interfaces.
- **react-dom**: Provides DOM-specific methods for React.
- **react-icons**: Icon library for React applications.
- **react-redux**: Official React bindings for Redux state management.
- **react-router-dom**: Declarative routing for React applications.
- **redux**: Predictable state container for JavaScript apps.
- **redux-thunk**: Middleware for Redux to handle asynchronous actions.

## Project Structure

cd view

The project follows a specific folder structure:

- **src**: Contains the source code files.
  - **components**: Contains reusable React components.
  - **pages**: Contains the main page components.
  - **customHook**: Contains utility/helper functions.
  - **redux**: Contains Redux-related files.
    - **action**: Contains action creators and functions for making API requests.
    - **reducers**: Contains Redux reducers.
    - **store**: Contains the Redux store configuration.
    - **actiontype**: Contains type of action.
  - **routes**: Contains Redux-related files.
    - **Allroute**: Contains routes.
   
# Snapshots

## Registeration Page

![Screenshot (266)](https://github.com/DishaGup/kanban-board/assets/115460391/7b0f7857-d647-4621-9153-0e761fbb5fbe)

---

## Homepage

![Screenshot (262)](https://github.com/DishaGup/kanban-board/assets/115460391/2321b93c-5ff2-4ef0-85af-4dd866586767)

![Screenshot (264)](https://github.com/DishaGup/kanban-board/assets/115460391/a3e7a5c0-8a82-425d-a282-49aef5a700e6)


---
