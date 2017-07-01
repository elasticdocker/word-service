import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {Logger} from './logger'

// PORT may be set using docker or env setting
const port: number = process.env.PORT || 3020;
const logDir: string = process.env.VOLUME_LOG || '.';

Logger.init(logDir,'word-service.log');

const app = express();
const server = http.createServer(app);

// Common middelware
app.use('/doc', express.static(path.join(__dirname, '..', '..', 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors());

app.use('/health', (req, res) => {
	res.sendStatus(200);
});

//Add all routes
require('./routes').default(app);

//start server
server.listen(port, () => {
	console.log(`Server is runnnin on port ${port}`);
});