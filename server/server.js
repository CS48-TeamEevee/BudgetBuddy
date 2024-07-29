const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = 3000;






const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});