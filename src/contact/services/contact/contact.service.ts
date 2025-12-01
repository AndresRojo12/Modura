/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer, { Transporter } from 'nodemailer';

@Injectable()
export class ContactService {
  private readonly transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: Number(this.configService.get('MAIL_PORT')),
      secure: true,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    }) as Transporter;
  }

  async sendContactEmail(
    name: string,
    lastName: string,
    email: string,
    artistName: string,
    sealNAME: string,
    linkMusic: { platform: string; url: string }[],
    socialsLink: { platform: string; url: string }[],
    category: string,
    jobOffer: string,
  ): Promise<void> {
    const socialIcons = {
      Instagram: '',
      TikTok: '',
      YouTube: '',
      Facebook: '',
      X: '',
    };

    const musicIcons = {
      Spotify: '',
      SoundCloud: '',
      YouTubeMusic: '',
    };

    const musicHTML = linkMusic.length
      ? linkMusic
          .map(
            (m) => `
          <p>
            <strong>${musicIcons[m.platform] || ''} ${m.platform}:</strong>
            <a href="${m.url}" target="_blank">${m.url}</a>
          </p>
        `,
          )
          .join('')
      : '<p>No se enviaron links de plataformas musicales.</p>';

    const socialsHTML = socialsLink.length
      ? socialsLink
          .map(
            (s) => `
          <p>
            <strong>${socialIcons[s.platform] || ''} ${s.platform}:</strong>
            <a href="${s.url}" target="_blank">${s.url}</a>
          </p>
        `,
          )
          .join('')
      : '<p>No se enviaron redes sociales.</p>';

    await this.transporter.sendMail({
      from: `"Formulario Web" <${this.configService.get<string>('MAIL_USER')}>`,
      to: this.configService.get<string>('MAIL_USER'),
      subject: 'Nuevo mensaje desde tu página web',
      html: `
    <h2>Nuevo mensaje desde el formulario de contacto</h2>

    <p><strong>Nombre:</strong> ${name} 
    <p><strong>Apellido:</strong> ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p
    <p><strong>Categoría:</strong> ${category}</p>

    
  ${category === 'Artista' ? `<p><strong>Artista:</strong> ${artistName}</p>` : ''}
  ${category === 'Sello' ? `<p><strong>Sello:</strong> ${sealNAME}</p>` : ''}

    <p><strong>Plataformas Musicales:</strong> ${musicHTML}</p>
    <p><strong>Redes sociales:</strong> ${socialsHTML}</p>

    <p><strong>Mensaje:</strong></p>
    <p>${jobOffer}</p>
  `,
    });
  }
}
