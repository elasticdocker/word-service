import { Payload } from '../payload';
import { WordService } from '../../dao';

export default class HangmanController {

	constructor() {
	}

	public getWord(req: any, res: any) {
		res.set('Cache-Control', 'no-cache');
		const gameType = req.query.gameType;
		// if (!!gameType && gameType.toUpperCase() == "STATENAME") {
		//     //      randomWord = this.stateArr[num];
		// } else {
		//     //       randomWord = this.firstNameArr[num];
		// }
		WordService.getWord(gameType).then((randomWord) => {
			let payload: Payload = {
				meta: [{input: {gameType: gameType}}, {size: 1}],
				data: [randomWord]
			};
			return res.json(payload);
		});
	}

}

