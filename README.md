# totalitycorp-frontend-challenge

# AK Store

Welcome to the Ecommerce Store project! This project is a full-stack MERN (MongoDB, Express.js, React, Node.js) application that allows users to browse and purchase a variety of products. It also integrates with Stripe for payment processing.

## Functionalities

1. **Product Listings**: The application displays various products with details such as name, image, and price. Users can easily browse through different products.

2. **Add to Cart**: Users can add products to their shopping cart by clicking the "Add to Cart" button on the product page.

3. **Cart Management**: In the cart, users can view the products they've added, adjust the quantity of each item, and remove items from the cart.

4. **Checkout**: Users can proceed to the checkout page, where they can enter their payment information. The application uses Stripe for secure payment processing.

5. **Stripe Integration**: The project integrates with Stripe for handling payments, ensuring a smooth and secure checkout process.

## Tech Stack

- **Frontend**:
  - React.js: Frontend JavaScript library for building user interfaces.
  - HTML/CSS: For structuring and styling the user interface.
  - Stripe.js: JavaScript library for integrating Stripe payments.
  
- **Backend**:
  - Node.js: JavaScript runtime environment for server-side logic.
  - Express.js: Web application framework for building APIs and handling requests.
  - MongoDB: NoSQL database for storing product and user data.

## Project Setup

The project repository is organized into two folders:

- **frontend**: Contains the frontend codebase, including React components, styles, and user interfaces.

- **backend**: Contains the backend logic, including API endpoints, user authentication, and database operations.

To set up and run the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the `frontend` folder:

   ```bash
   cd frontend
   ```

3. Install frontend dependencies:

   ```bash
   npm install
   ```

4. Start the frontend development server:

   ```bash
   npm run dev
   ```

5. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to access the frontend.

6. Navigate to the `backend` folder:

   ```bash
   cd ../backend
   ```

7. Install backend dependencies:

   ```bash
   npm install
   ```

8. Configure your MongoDB connection in the backend code as needed.

9. Start the backend server:

   ```bash
   nodemon index.js
   ```

10. Your application should now be up and running with the frontend accessible at [http://localhost:3000](http://localhost:3000) and the backend running on a specified port.


## License

This project is licensed under the [MIT License](LICENSE.md).

Feel free to contribute, report issues, or provide feedback to help improve this Ecommerce Store project. Thank you for using and supporting this open-source project!
