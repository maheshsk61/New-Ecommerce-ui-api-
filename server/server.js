require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./router');
const cors = require('cors')
const path = require('path');
const port = process.env.PORT || 4000;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api", router)

app.listen(port, () => {
    console.log(`Server is running on ${baseUrl}`);
});
