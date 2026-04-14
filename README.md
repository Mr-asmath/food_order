# MERN Food Order App 🍕

A full-stack food ordering application built with MongoDB, Express, React, and Node.js (MERN stack).

## Features

✅ User authentication (Register/Login)
✅ Browse foods by categories 
✅ Add/remove items from shopping cart
✅ Place orders with delivery details
✅ View order history and status
✅ Responsive design for mobile and desktop
✅ JWT-based authentication
✅ MongoDB database integration

## Project Structure

```
food_order/
├── backend/
│   ├── models/
│   │   ├── Food.js
│   │   ├── User.js
│   │   └── Order.js
│   ├── controllers/
│   │   ├── foodController.js
│   │   ├── userController.js
│   │   └── orderController.js
│   ├── routes/
│   │   ├── foodRoutes.js
│   │   ├── userRoutes.js
│   │   └── orderRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Header.js
    │   │   ├── Header.css
    │   │   ├── FoodCard.js
    │   │   └── FoodCard.css
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Home.css
    │   │   ├── Cart.js
    │   │   ├── Cart.css
    │   │   ├── Orders.js
    │   │   ├── Orders.css
    │   │   ├── Auth.js
    │   │   └── Auth.css
    │   ├── context/
    │   │   ├── CartContext.js
    │   │   └── AuthContext.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    ├── package.json
    └── public
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation & Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env with your MongoDB URI and JWT secret
# MONGODB_URI=mongodb://localhost:27017/food_order
# PORT=5000
# JWT_SECRET=your_secret_key_here
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory (in another terminal)
cd frontend

# Install dependencies
npm install
```

### 3. Database Setup (Optional - Seed Data)

Before running, you can add sample foods to MongoDB:

```bash
# In MongoDB or MongoDB Compass, create these documents in the 'foods' collection:

{
  "name": "Margherita Pizza",
  "description": "Classic pizza with tomato, mozzarella, and basil",
  "price": 250,
  "category": "Pizza",
  "image": "https://via.placeholder.com/300",
  "available": true,
  "rating": 4.8
}

{
  "name": "Cheese Burger",
  "description": "Delicious burger with melted cheese and fresh lettuce",
  "price": 150,
  "category": "Burger",
  "available": true,
  "rating": 4.5
}

{
  "name": "Biryani",
  "description": "Fragrant Indian rice dish with spices and meat",
  "price": 300,
  "category": "Biryani",
  "available": true,
  "rating": 4.9
}

{
  "name": "Chocolate Cake",
  "description": "Rich and moist chocolate cake",
  "price": 200,
  "category": "Dessert",
  "available": true,
  "rating": 4.7
}
```

## Running the Application

### Terminal 1 - Start Backend Server

```bash
cd backend
npm run dev
# or
npm start
```

Server will run on `http://localhost:5000`

### Terminal 2 - Start Frontend Development Server

```bash
cd frontend
npm start
```

App will open on `http://localhost:3000`

## Run With Docker

You can run the full project with Docker and Docker Compose.

### Prerequisites

- Docker Desktop

### Start the app

```bash
docker compose up --build
```

### Access the app

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

### Stop the app

```bash
docker compose down
```

## Deploy

This repo is deployment-ready for a split frontend and backend setup.

### Recommended hosting

- Frontend: Vercel or Render Static Site
- Backend: Render Web Service

### Render

This repo includes [render.yaml](d:\program\node js\food_order\render.yaml) for Render Blueprints.

Backend notes:
- Uses SQLite, so attach a persistent disk in Render
- `SQLITE_STORAGE_PATH` is set to `/var/data/database.sqlite` in the blueprint

Frontend notes:
- Set `REACT_APP_API_URL` to your deployed backend API URL, for example `https://your-backend.onrender.com/api`

Backend environment variables:
- `JWT_SECRET`
- `CORS_ORIGIN`
- `SQLITE_STORAGE_PATH`

Frontend environment variables:
- `REACT_APP_API_URL`

### Vercel frontend

If you deploy the frontend to Vercel, set the project root to `frontend` and add:

```bash
REACT_APP_API_URL=https://your-backend-url/api
```

## API Endpoints

### Food Routes
- `GET /api/foods` - Get all foods
- `GET /api/foods/category/:category` - Get foods by category
- `GET /api/foods/:id` - Get single food
- `POST /api/foods` - Add new food (admin)
- `PUT /api/foods/:id` - Update food (admin)
- `DELETE /api/foods/:id` - Delete food (admin)

### User Routes
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Order Routes
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Delete order

## Usage Guide

1. **Home Page**: Browse all foods or filter by category
2. **Add to Cart**: Click "Add to Cart" on any food item
3. **View Cart**: Click cart icon in header to view items
4. **Checkout**: Proceed to checkout
5. **Login/Register**: Create account or login if not authenticated
6. **Place Order**: Confirm delivery details and place order
7. **View Orders**: Go to "My Orders" to see order history and status

## Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

## Learning & Development

This project covers:
- Full-stack MERN development
- RESTful API design
- Authentication & Authorization
- Database modeling
- State management with React Context
- Component-based architecture
- Responsive design

## Future Enhancements

- Payment gateway integration (Stripe/PayPal)
- Real-time order tracking
- Admin dashboard
- Email notifications
- Restaurant ratings and reviews
- Search functionality
- Photo uploads
- Multiple restaurant support
- Real-time updates with WebSockets

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running locally or update `MONGODB_URI` in `.env`
- Use MongoDB Atlas connection string if using cloud MongoDB

### Port Already in Use
- Change `PORT` in backend `.env` if 5000 is occupied
- Update `proxy` in `frontend/package.json` to match new port

### CORS Error
- Check that backend is running
- Verify `cors()` middleware is enabled in `server.js`
- Check proxy setting in frontend `package.json`

### Authentication Issues
- Clear browser cookies/localStorage
- Check `JWT_SECRET` is set in `.env`
- Verify token is being stored correctly

## License

This project is open source and available under the MIT License.

## Author

Created as a MERN stack learning project.

---

**Happy Ordering! 🍕🍔🍚**
