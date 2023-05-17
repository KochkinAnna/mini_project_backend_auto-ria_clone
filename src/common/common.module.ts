import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import * as process from 'process';

import { MailService } from './mail/mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: `smtp://${process.env.MAILER_USER}:${process.env.MAILER_PASS}@${process.env.MAILER_SMTP}`,
      defaults: {
        from: '"nest-bonus" <september@nestjs.com>',
      },
      template: {
        dir: path.join(__dirname, '..', '..', '/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class CommonModule {}
