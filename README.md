# Quick Start Guide

## Running the Application

1. Install dependencies by running `npm install`.
2. Start the JSON database server using the command:
   ```
   npx json-server --watch db.json --port 3001
   ```
3. Launch the React application with `npm start`.
4. Open your browser and navigate to `http://localhost:3000` to begin using the application.

## Functionality Overview

The application provides the following features:

- **Viewing Product List:** The main page displays a list of available products along with their basic characteristics.
- **Viewing Product Details:** Clicking on a product from the list opens a page with detailed information about the product, including its name, quantity, dimensions, weight, and comments.
- **Adding a Comment to a Product:** Users can add a comment to a product by entering the comment text in a text field and clicking the "Add Comment" button.
- **Deleting a Comment:** Users can delete a comment by clicking the "Delete" button next to the comment on the product page.
- **Deleting a Product:** Users can delete a product by clicking the "Delete Product" button on the product details page.

## Technologies Used

- React: Frontend framework for building user interfaces.
- Redux Toolkit: State management library for storing data and managing interaction with the server.
- JSON Server: Powerful tool for creating a fake REST API server based on a JSON file.

## Developer

Author: Viacheslav Stryzh

