# SETUP GUIDE

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Pritii-9/Quotation.git
   ```

2. Navigate into the project directory:
   ```bash
   cd Quotation
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration
1. Create a `.env` file in the root directory and add the following environment variables:
   ```dotenv
   MONGODB_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   ```

2. Replace `<your_mongodb_uri>` with your MongoDB connection string.

3. Replace `<your_jwt_secret>` with a secure random string.

## Running the Application
1. To start the server in development mode:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5000` to see the application running.

3. For production build:
   ```bash
   npm run build
   npm start
   ```

## Additional Notes
- Ensure that you have Node.js and MongoDB installed.
- For more details on each functionality, check the documentation within the repository.