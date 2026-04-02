# Inventory Management System

## Project Overview

The Inventory Management System is a comprehensive full-stack web application designed to help businesses efficiently track and manage their product stock. Its primary purpose is to provide an intuitive, responsive dashboard that allows users to monitor inventory levels, manage product details, and quickly identify items that require restocking. 

## Features

* **CRUD operations:** Full support to add, view, update, and delete products from the inventory.
* **Search functionality:** Quickly find specific products by searching for their name.
* **Category filtering:** Easily filter the inventory list based on product categories.
* **Low stock detection:** Automatically highlights items that have dropped below a critical stock threshold.

## Tech Stack

* **React** (Vite) - Frontend User Interface
* **Node.js** - Backend JavaScript Runtime
* **Express** - Backend Web Application Framework
* **MongoDB** - NoSQL Database (MongoDB Atlas)

## Folder Structure

The repository is modularly structured into two main components:

* `backend/`: This directory contains the server-side code. It is responsible for handling database connections, defining API endpoints, and processing business logic using Node.js and Express.
* `frontend/`: This directory houses the client-side application built with React and Vite. It contains all the UI components, styles, and state management required for the user interface.

## Setup Instructions

Follow these step-by-step instructions to get the project up and running locally.

### Backend Setup:

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `backend` folder.
4. Add your MongoDB URI (refer to the Environment Variables section below).
5. Start the backend server:
   ```bash
   node server.js
   ```

### Frontend Setup:

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## Environment Variables

For the backend to function correctly, you must create a `.env` file in the `backend/` directory. It should contain the following environment variables:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```
MONGO_URI=mongodb://127.0.0.1:27017/inventory_db
PORT=5000

## Assumptions Made

* **Authentication removed as not required:** User login and signup features were intentionally omitted to focus solely on core inventory management functionality.
* **MongoDB Atlas used instead of local DB:** The primary database configuration targets a cloud-hosted MongoDB Atlas cluster for demonstration purposes.
* **Sample data added for demonstration:** Initial mock data may be present in the database to immediately showcase the application's features upon setup.

## Future Improvements

* Add authentication system (JWT-based login and registration).
* Deploy to cloud environments (e.g., Vercel for frontend, Render for backend).
* Improve UI/UX further with animations and advanced charting for data analytics.
* Add pagination to handle the application scaling with thousands of inventory items.

## Notes

* Project runs locally and requires Node.js to be installed on your machine.
* Clean and modular code structure maintained throughout the codebase for maximum readability and future scalability.
