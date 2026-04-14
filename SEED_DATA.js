// Sample data to seed MongoDB with initial foods
// Run this in MongoDB Compass or mongosh to populate the database

db.foods.insertMany([
  {
    name: "Margherita Pizza",
    description: "Classic pizza with tomato, mozzarella, and fresh basil",
    price: 250,
    category: "Pizza",
    image: "https://via.placeholder.com/300?text=Margherita+Pizza",
    available: true,
    rating: 4.8,
    createdAt: new Date()
  },
  {
    name: "Pepperoni Pizza",
    description: "Delicious pizza topped with pepperoni and mozzarella",
    price: 280,
    category: "Pizza",
    image: "https://via.placeholder.com/300?text=Pepperoni+Pizza",
    available: true,
    rating: 4.7,
    createdAt: new Date()
  },
  {
    name: "Cheese Burger",
    description: "Juicy burger with melted cheddar cheese and fresh vegetables",
    price: 150,
    category: "Burger",
    image: "https://via.placeholder.com/300?text=Cheese+Burger",
    available: true,
    rating: 4.5,
    createdAt: new Date()
  },
  {
    name: "Chicken Burger",
    description: "Crispy fried chicken burger with special sauce",
    price: 180,
    category: "Burger",
    image: "https://via.placeholder.com/300?text=Chicken+Burger",
    available: true,
    rating: 4.6,
    createdAt: new Date()
  },
  {
    name: "Mutton Biryani",
    description: "Fragrant Indian rice dish cooked with tender mutton pieces",
    price: 350,
    category: "Biryani",
    image: "https://via.placeholder.com/300?text=Mutton+Biryani",
    available: true,
    rating: 4.9,
    createdAt: new Date()
  },
  {
    name: "Chicken Biryani",
    description: "Aromatic basmati rice layered with spiced chicken",
    price: 300,
    category: "Biryani",
    image: "https://via.placeholder.com/300?text=Chicken+Biryani",
    available: true,
    rating: 4.8,
    createdAt: new Date()
  },
  {
    name: "Vegetable Biryani",
    description: "Vegetarian biryani with mixed fresh vegetables and spices",
    price: 220,
    category: "Biryani",
    image: "https://via.placeholder.com/300?text=Veg+Biryani",
    available: true,
    rating: 4.5,
    createdAt: new Date()
  },
  {
    name: "Chocolate Cake",
    description: "Rich and moist chocolate cake with smooth frosting",
    price: 200,
    category: "Dessert",
    image: "https://via.placeholder.com/300?text=Chocolate+Cake",
    available: true,
    rating: 4.7,
    createdAt: new Date()
  },
  {
    name: "Cheesecake",
    description: "Creamy New York style cheesecake with graham cracker crust",
    price: 250,
    category: "Dessert",
    image: "https://via.placeholder.com/300?text=Cheesecake",
    available: true,
    rating: 4.8,
    createdAt: new Date()
  },
  {
    name: "Ice Cream Sundae",
    description: "Vanilla ice cream topped with chocolate sauce and sprinkles",
    price: 120,
    category: "Dessert",
    image: "https://via.placeholder.com/300?text=Ice+Cream",
    available: true,
    rating: 4.6,
    createdAt: new Date()
  }
]);

// You can paste this code in MongoDB Compass console or mongosh
// Make sure you're in the 'food_order' database
