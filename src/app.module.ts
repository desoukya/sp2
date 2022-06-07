import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AwsService } from './aws.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `config/${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AwsService],
})
export class AppModule {}
