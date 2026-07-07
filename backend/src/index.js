require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const cartSession = require('./middleware/cartSession');
const errorHandler = require('./middleware/errorHandler');

const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const checkoutRouter = require('./routes/checkout');
const ordersRouter = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors({ exposedHeaders: ['x-cart-id'] }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cartSession);

// Health check - this is what the ALB target group / ECS health check hits
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);
app.use('/api/orders', ordersRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`MiniShop backend listening on port ${PORT}`);
});

module.exports = app;
// CI/CD test
