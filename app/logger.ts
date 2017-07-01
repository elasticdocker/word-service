import * as morgan from 'morgan';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

export class Logger {

	private static logger: any;

	public static init(logDir: string, logFile: string) {
		const logStream = fs.createWriteStream(path.join(logDir, logFile), {flags: 'a'});
		morgan.token('client-ip', (req, res) => {
			const headerIp = req.headers['x-forwarded-for'];
			const connectionIp = req.connection.remoteAddress;
			return headerIp ? headerIp : '' + ' ' + connectionIp ? connectionIp : '';
		});
		morgan.token('server-ip', () => os.hostname());
		morgan.token('service-log', (req, res) => res._headers['x-service-log']);
		morgan.token('aws-log', (req, res) => {
			req.headers['x-aws-log']
		});
		const logFormat = ':date[iso] :client-ip :server-ip ":method :url HTTP/:http-version" :status :service-log :aws-log :res[content-length] :response-time ms';
		Logger.logger = morgan(logFormat, {stream: logStream});
	}

	public static log(req: any, res: any, next: any, resStr: string) {
		res._headers['x-service-log'] = resStr;
		Logger.logger(req, res, next);
	}
}