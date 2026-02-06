const express = require('express');
const cors = require('cors');
const productRoute = require('./routes/products')
const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const app = express();
app.use(cors());
app.use(express.json())

app.use('/products', productRoute)
app.use('/users', registerRoute)
app.use('/users/login', loginRoute)

const port = 5000;
app.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}...`))