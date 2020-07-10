import IMailProvder from '../models/IMailProvider';
import ISendMailDto from '../dtos/ISendMailDTO';

export default class FakeMailProvider implements IMailProvder {
  private messages: ISendMailDto[] = [];

  public async sendMail(message: ISendMailDto): Promise<void> {
    this.messages.push(message);
  }
}
