import { Module } from '@nestjs/common';
import { ContactService } from './services/contact/contact.service';
import { ContactController } from './controllers/contact.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [ContactService],
  controllers: [ContactController],
})
export class ContactModule {}
