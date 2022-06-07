import { Controller, Get } from '@nestjs/common';
import { AwsService } from './aws.service';

@Controller()
export class AppController {
  constructor(private readonly awsService: AwsService) {}

  @Get()
  async createOrder(): Promise<any> {
    const order = {
      header: {
        version: '1.0.0',
        event: {
          version: '1.1.0',
          category: 'online-order',
          name: 'shopify',
          type: 'data',
          origin: 'facebook',
          timestamp: '2019-12-04T21:36:40.040Z',
          env: 'palm',
        },
      },
      body: {
        actionCode: 'CREATED',
        webOrderId: '24593',
        productId: '01',
      },
    };
    const results = await this.awsService.emitMessage(order);
    return {
      message: 'Successfully created order!',
      id: results.MessageId,
    };
  }
}
