import AppError from '@shared/errors/AppError';

import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'victor',
      email: 'vefg@cin.ufpe.br',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create user with email already registered', async () => {
    await createUserService.execute({
      name: 'victor',
      email: 'vefg@cin.ufpe.br',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'alice',
        email: 'vefg@cin.ufpe.br',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
