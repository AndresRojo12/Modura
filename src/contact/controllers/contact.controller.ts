import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from '../services/contact/contact.service';
import { CreateContactDto } from '../dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async send(@Body() body: CreateContactDto) {
    await this.contactService.sendContactEmail(
      body.name,
      body.lastName,
      body.email,
      body.artistName,
      body.sealNAME,
      body.linkMusic,
      body.socialsLink,
      body.category,
      body.jobOffer,
    );

    return { message: 'Mensaje enviado correctamente' };
  }
}
