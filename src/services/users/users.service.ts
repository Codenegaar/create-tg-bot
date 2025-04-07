import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { State } from './state.enum';

export class UsersService {
  constructor(private usersRepository: Repository<User>) {}

  async getUserState(id: number): Promise<State> {
    //Try to find the user
    const user = await this.usersRepository.findOne({
      where: { id },
    })
    if (!user) {
      //Create user
      await this.usersRepository.save({
        id,
        state: State.LAMBDA,
      });
      return State.LAMBDA;
    }

    return user.state;
  }

  async saveUserState(id: number, state: State) {
    await this.usersRepository.update(
      { id },
      { state },
    );
  }
}
