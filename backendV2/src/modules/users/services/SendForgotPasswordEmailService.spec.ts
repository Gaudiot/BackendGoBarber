import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'victor',
      email: 'vefg@cin.ufpe.br',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'vefg@cin.ufpe.br',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover the password from non-existing user', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'vefg@cin.ufpe.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'victor',
      email: 'vefg@cin.ufpe.br',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'vefg@cin.ufpe.br',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
