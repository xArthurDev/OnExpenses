import { Logger } from '@nestjs/common';
import { newExpenseEmail } from './templates/new-expense.template';
import { INewExpenseEmailParams } from 'src/interfaces/messaging/messaging.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sgMail = require('@sendgrid/mail');

export class MessagingService {
  private logger = new Logger(MessagingService.name);

  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendNewExpenseEmail(params: INewExpenseEmailParams): Promise<void> {
    const { email } = params;
    const message = {
      to: email,
      from: `${process.env.EMAIL_REPLY_TO}`,
      subject: 'Despesa cadastrada',
      html: newExpenseEmail(params),
    };
    sgMail
      .send(message)
      .then(() => {
        console.log('Email sent');
        this.logger.verbose(`Email sent to ${email}`);
      })
      .catch((error) => {
        console.error(error);
        this.logger.error(error);
      });
  }
}
