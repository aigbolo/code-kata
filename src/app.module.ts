import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupermarketModule } from './supermarket/supermarket.module';

@Module({
  imports: [SupermarketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
