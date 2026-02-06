const express = require('express');
const cors = require('cors');
const productRoute = require('./routes/products')
const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const productSpecificRoute = require('./routes/productSpecific');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', registerRoute)
app.use('/users/login', loginRoute)
app.use('/products', productRoute);
app.use('/products', productSpecificRoute);

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));