/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class ContactService {
  private readonly resend: Resend;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY);
    if (!apiKey) throw new Error('RESEND_API_KEY no está configurada');
    this.resend = new Resend(apiKey);
  }

  
  async sendContactEmail(
    name: string,
    lastName: string,
    email: string,
    category: string,
    artistName: string,
    sealNAME: string,
    musicPlatform: { platform: string; url: string }[] = [],
    yourSocials: { platform: string; url: string }[] = [],
    message: string,
  ): Promise<void> {
    const from = this.configService.get<string>('MAIL_FROM');
    const to = this.configService.get<string>('MAIL_TO');

    if (!from || !to) {
      throw new Error('MAIL_FROM o MAIL_TO no están configurados');
    }

    

    await this.resend.emails.send({
      from,
      to,
      subject: 'Nuevo mensaje desde tu portafolio',
      html: `
      <h2>Nuevo mensaje desde el formulario de contacto</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Apellido:</strong> ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Categoría:</strong> ${category}</p>
      ${artistName ? `<p><strong>Nombre del Artista:</strong> ${artistName}</p>` : ''}
      ${sealNAME ? `<p><strong>Nombre del Sello:</strong> ${sealNAME}</p>` : ''}

      <h4>Plataformas musicales</h4>
      ${musicPlatform}

      <h4>Redes sociales</h4>
      ${yourSocials}

      <h4>Mensaje</h4>
      <p>${message}</p>
    `,
    });
  }
}
