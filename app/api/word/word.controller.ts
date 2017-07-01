import { Payload } from '../payload';
import { FirstNameService, StateNameService } from '../../dao';
import { Logger }from '../../logger'
export class WordController {

	private firstNameService;
	private stateNameService;

	constructor() {
		this.firstNameService = new FirstNameService();
		this.stateNameService = new StateNameService();
	}

	public getWord() {
		return (req: any, res: any, next: any) => {
			res.set('Cache-Control', 'no-cache');
			let wordPromise: Promise<string>;
			const gameType = req.query.gameType;
			if (!!gameType && gameType.toUpperCase() == "STATENAME") {
				wordPromise = this.getStateName();
			} else {
				wordPromise = this.getFirstName();
			}

			wordPromise.then((randomWord) => {
				let payload: Payload = {
					meta: [{input: {gameType: gameType}}, {size: 1}],
					data: [randomWord]
				};
				const serviceLog = randomWord;
				Logger.log(req, res, next, serviceLog);
				return res.json(payload);
			});
		}
	}

	private getFirstName(): Promise<string> {
		return this.firstNameService.getWord();
	}

	private getStateName(): Promise<string> {
		return this.stateNameService.getWord();
	}
}