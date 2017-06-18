import { DynamoDb } from '../dynamoDb-util';

export class WordService {

	public static getWord(gameType: string): Promise<any> {
		const num: number = Math.floor(Math.random() * 5) + 1;
		const dynamodb = new DynamoDb().getDynamodb();
		const params = {
			TableName: 'words',
			Key: {
				id: {N: num.toString()}
			},
			AttributesToGet: [
				'word'
			]
		};

		let randomWord: string;

		return new Promise<string>((resolve, reject) => {
			dynamodb.getItem(params, function (err, data) {
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