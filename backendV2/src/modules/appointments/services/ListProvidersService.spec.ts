// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const loggedUser = await fakeUsersRepository.create({
      name: 'victor',
      email: 'vefg@cin.ufpe.br',
      password: '123123',
    });

    const user1 = await fakeUsersRepository.create({
      name: 'drica',
      email: 'drica@cin.ufpe.br',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'adriellen',
      email: 'patinha@cin.ufpe.br',
      password: '123123',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});