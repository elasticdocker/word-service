import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as fs from 'fs';

// PORT may be set using docker or env setting
const port: number = process.env.PORT || 3020;
const logDir: string = process.env.VOLUME_LOG || '.';

const app = express();
const server = http.createServer(app);

// Common middelware
app.use('/doc', express.static(path.join(__dirname, '..', '..', 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors());

// Before logger
app.use('/health', (req, res) => {
	res.sendStatus(200);
});

const logStream = fs.createWriteStream(path.join(logDir, 'word-service.log'), {flags: 'a'});
const logFormat = ':remote-addr - [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms';

app.use(morgan(logFormat, {stream: logStream}));

//Add all routes
require('./routes').default(app);

//start server
server.listen(port, () => {
	console.log(`Server is runnnin on port ${port}`);
});