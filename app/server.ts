import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

// PORT may be set using docker or env setting
const port: number = process.env.PORT || 3020;

const app = express();
const server = http.createServer(app);

// Common middelware
app.use('/doc', express.static(path.join(__dirname, '..', '..', 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors());

//Add all routes
require('./routes').default(app);

app.use('/health', (req, res)=>{
	res.send(200);
});

//start server
server.listen(port, () => {
	console.log(`Server is runnnin on port ${port}`);
});