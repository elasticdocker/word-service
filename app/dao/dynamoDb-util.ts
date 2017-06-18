var AWS = require("aws-sdk");

export class DynamoDb {

	private dynamodb;

	constructor() {
		const myConfig = new AWS.Config({
			region: 'us-west-2'
		});
		this.dynamodb = new AWS.DynamoDB(myConfig);
	}

	public getDynamodb() {
		return this.dynamodb;
	}

}