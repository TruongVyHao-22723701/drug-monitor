require('dotenv').config(); // ⚡ load .env ngay đầu tiên

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connectMongo = require('./server/database/connect');
const { notFoundHandler, errorHandler } = require('./server/middleware/errorHandler');

const PORT = process.env.PORT || 3000;

// Test xem biến env có load chưa
console.log("Loaded MONGO_STR:", process.env.MONGO_STR);

// Middleware parse JSON
app.use(express.json());

// Middleware parse URL-encoded (form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

// set view engine
app.set('view engine', 'ejs');

// serve static files
app.use(express.static('assets'));

// log http requests
app.use(morgan('tiny'));

// connect to Database
connectMongo();

// load routes
app.use('/', require('./server/routes/routes'));

// ⚡ Error Handlers (đặt cuối cùng)
app.use(notFoundHandler);
app.use(errorHandler);

// global crash handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1); // nếu muốn app restart bởi PM2/Nodemon
});

app.listen(PORT, function() {
  console.log('listening on ' + PORT);
  console.log(`Welcome to the Drug Monitor App at http://localhost:${PORT}`);
});
