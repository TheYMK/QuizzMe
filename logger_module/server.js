const express = require('express');
const loggerRouter = require('./routes/logger.routes');
const morgan = require('morgan');
const cors = require('cors');

// Constants
const PORT = 8083;
const corsOptions = {
  origin: [
    'http://0.0.0.0:8080',
    'http://0.0.0.0:8081',
    'http://0.0.0.0:8082',
    'http://localhost:3001',
  ],
  credentials: true,
};

// App
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/logger', loggerRouter);
app.use(cors(corsOptions));

app.listen(PORT, () =>
  console.log('\x1b[33m%s\x1b[0m', `Server listen on port : ${PORT} 🚀`)
);
