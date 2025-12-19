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
    if (!apiKey) throw new Error('RESEND_API_KEY no está configurada');
    this.resend = new Resend(apiKey);
  }

  async sendContactEmail(
    name: string,
    lastName: string,
    email: string,
    category: string[],
    musicPlatform: string[],
    yourSocials: string[],
    message: string,
  ): Promise<void> {
    try {
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
            <p><strong>Categoría:</strong> ${category.join(', ')}</p>
            <p><strong>Plataforma musical:</strong> ${musicPlatform.join(', ')}</p>
            <p><strong>Tus redes sociales:</strong> ${yourSocials.join(', ')}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
        `,
      });
    } catch (error) {
      console.error('Error enviando email con Resend:', error);
      throw new InternalServerErrorException('No se pudo enviar el correo');
    }
  }
}
