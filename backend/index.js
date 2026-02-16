const express = require('express');
const cors = require('cors');
const productRoute = require('./routes/products');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const productSpecificRoute = require('./routes/productSpecific');
const basketRoute = require('./routes/basket');
const checkOutRoute = require('./routes/handleCheckout');
const orderRoute = require("./routes/order");
const favoritesRoute = require("./routes/favorites");
const { authenticateToken, authenticateAdmin } = require('./middleware/authenticate');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/orders', orderRoute);
app.use('/checkout', checkOutRoute);
app.use('/basket', basketRoute);
app.use('/users/register', registerRoute);
app.use('/users/login', loginRoute);
app.use('/products',  productRoute);
app.use('/products', productSpecificRoute);
app.use('/favorites', favoritesRoute);

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));