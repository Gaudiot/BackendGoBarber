import AppError from '@shared/errors/AppError';

import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'victor',
      email: 'vefg@cin.ufpe.br',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'vefg@cin.ufpe.br',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate user with non registered email', async () => {
    expect(
      authenticateUserService.execute({
        email: 'vefg@cin.ufpe.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'victor',
      email: 'vefg@cin.ufpe.br',
      password: '123456',
    });

    await expect(
      authenticateUserService.execute({
        email: 'vefg@cin.ufpe.br',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
