const express = require('express');
const cors = require('cors');
const productRoute = require('./routes/products')
const registerRoute = require('./routes/register')
const app = express();
app.use(cors());
app.use(express.json())

app.use('/products', productRoute)
app.use('/customers', registerRoute)


const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`))