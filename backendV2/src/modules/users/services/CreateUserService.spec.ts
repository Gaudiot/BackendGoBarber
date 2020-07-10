import AppError from '@shared/errors/AppError';

import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'victor',
      email: 'vefg@cin.ufpe.br',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create user with email already registered', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'victor',
      email: 'vefg@cin.ufpe.br',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'alice',
        email: 'vefg@cin.ufpe.br',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
