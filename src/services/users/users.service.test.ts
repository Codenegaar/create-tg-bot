import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { createMockRepository, MockRepository } from '../../utils/tests.util';
import { UsersService } from './users.service';
import { State } from '../../shared/state.enum';

describe('Users service', () => {
  let usersService: UsersService;
  let usersRepository: MockRepository<User>;

  beforeEach(() => {
    usersRepository = createMockRepository<User>();
    usersService = new UsersService(usersRepository as unknown as Repository<User>);
  });

  it('should find a user\'s state when it exists', async() => {
    usersRepository.findOne?.mockResolvedValue({
      id: 1000,
      state: State.MAIN_MENU,
    });

    const userState = await usersService.getUserState(1000);
    expect(userState).toBe(State.MAIN_MENU);
    expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
  });

  it('should fail to find a user\'s state and attempt to create it', async() => {
    usersRepository.findOne?.mockResolvedValue(null);
    
    const userState = await usersService.getUserState(1000);
    expect(userState).toBe(State.LAMBDA);
    expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
    expect(usersRepository.save).toHaveBeenCalledWith({ id: 1000, state: State.LAMBDA });
  });
});
