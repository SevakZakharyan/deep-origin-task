import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import {PostgresClientModule} from "@app/postgres-client";

@Module({
  imports: [PostgresClientModule],
  controllers: [UrlController],
  providers: [UrlService]
})
export class UrlModule {}
