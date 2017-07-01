import { DynamoDb } from '../dynamoDb-util';

export class StateNameService {

	protected dynamodb;

	constructor() {
		this.dynamodb = new DynamoDb().getDynamodb();
	}

	public  getWord(): Promise<string> {
		const num: number = Math.floor(Math.random() * 5) + 1;
		const params = {
			TableName: 'statename',
			Key: {
				id: {S: num.toString()}
			},
			AttributesToGet: [
				'word'
			]
		};

		let randomWord: string;

		return new Promise<string>((resolve, reject) => {
			this.dynamodb.getItem(params, function (err, data) {
				if (err) {
					reject(err.toString());
				} else {
					if (!!data.Item && !!data.Item.word) {
						resolve(data.Item.word.S);
					} else {
						reject("output is undefined");
					}
				}
			})
		});
	}

}