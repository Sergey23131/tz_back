require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routers/user-router');
const swaggerUI = require('swagger-ui-express');
const swaggerJson = require('./docs/swagger.json');

const {ErrorHandler, errors_massage} = require('./errors');
const {PORT, MONGO_CONNECT_URL, ALLOWED_ORIGIN, NODE_ENV} = require('./configs/config');


const app = express();

app.use(cors({origin: _configureCors}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(MONGO_CONNECT_URL);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));
app.use('/users', userRouter);

app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});

function _configureCors(origin, callback) {

    if (NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whitelist = ALLOWED_ORIGIN.split(';');

    if (!whitelist.includes(origin)) {
        return callback(new ErrorHandler(errors_massage.CORS_ALLOW), false);
    }
    return callback(null, true);
}
