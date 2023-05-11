import { Module } from '@nestjs/common';

import { CardealershipServiceManagerService } from './cardealership-service-manager.service';

@Module({
  providers: [CardealershipServiceManagerService],
})
export class CardealershipServiceManagerModule {}
