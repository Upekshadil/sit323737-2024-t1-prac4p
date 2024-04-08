const express = require('express');
const winston = require('winston');
const app = express();
const port = 3000;

// Winston logger configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple()
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

// Middleware to log requests
app.use((req, res, next) => {
    logger.log({
        level: 'info',
        message: `Received ${req.method} request for ${req.url} from ${req.ip}`
    });
    next();
});

// Addition endpoint
app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if (isNaN(num1) || isNaN(num2)) {
        logger.log({
            level: 'error',
            message: 'Invalid input parameters for addition'
        });
        res.status(400).send('Invalid input parameters for addition');
    } else {
        const result = num1 + num2;
        res.send(`Result: ${result}`);
    }
});

// Subtraction endpoint
app.get('/subtract', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if (isNaN(num1) || isNaN(num2)) {
        logger.log({
            level: 'error',
            message: 'Invalid input parameters for subtraction'
        });
        res.status(400).send('Invalid input parameters for subtraction');
    } else {
        const result = num1 - num2;
        res.send(`Result: ${result}`);
    }
});

// Multiplication endpoint
app.get('/multiply', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if (isNaN(num1) || isNaN(num2)) {
        logger.log({
            level: 'error',
            message: 'Invalid input parameters for multiplication'
        });
        res.status(400).send('Invalid input parameters for multiplication');
    } else {
        const result = num1 * num2;
        res.send(`Result: ${result}`);
    }
});

// Division endpoint
app.get('/divide', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if (isNaN(num1) || isNaN(num2) || num2 === 0) {
        logger.log({
            level: 'error',
            message: 'Invalid input parameters for division'
        });
        res.status(400).send('Invalid input parameters for division');
    } else {
        const result = num1 / num2;
        res.send(`Result: ${result}`);
    }
});

// Handling root path
app.get('/', (req, res) => {
    res.send('Welcome to the Arithmetic Operations API. Use /add, /subtract, /multiply, /divide endpoints to perform arithmetic operations.');
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.log({
        level: 'error',
        message: err.message
    });
    res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});
