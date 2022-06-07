import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AwsService {
  private sqs;
  private sns;
  constructor() {
    AWS.config.update({
      region: 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    this.sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
    this.sns = new AWS.SNS({ apiVersion: '2010-03-31' });
  }

  /**
   * Sends a message to SNS topic
   */
  async emitMessage(message: snsMessage) {
    const params = {
      Message: JSON.stringify(message),
      TopicArn: process.env.SNS_ARN,
    };
    return this.sns.publish(params).promise();
  }
}

interface snsMessage {
  header: any;
  body: any;
}
