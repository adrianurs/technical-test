import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import mainRoutes from './routes/main.routes';

const router = express();
const port = 5050;
// Connect to MongoDB
mongoose
    .connect('mongodb://127.0.0.1:27017/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error: Error) => {
        console.log(error);
    })

//Express functionality for cors (safe) connection and authentication
router.use(cors({
    origin: true,
    credentials: true
}));

//Express functionality for increase the json data parsed via body request
router.use(bodyParser.json({
    limit: '500mb'
}));

//Express functionality for increase the json data parsed via urlencoded request
router.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true 
}));

//Express functionality for parsing data as a json format
router.use(bodyParser.json());

//The route for api - the place from where app is starting
router.use('/technical-test/api', mainRoutes);

router.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});