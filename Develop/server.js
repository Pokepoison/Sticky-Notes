const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // Serve static files

// Your routes will be added here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
