import AppDataSource from '../config/data-source';
import { User } from '../entities/user.entity';
import { UsersService } from './users/users.service';

export class ServiceContainer {
  private constructor() {
    this._usersService = new UsersService(AppDataSource.getRepository(User));
  }

  public static getInstance(): ServiceContainer {
    if (!this._instance) {
      this._instance = new ServiceContainer();
    }
    return this._instance;
  }

  //Service getters
  public get usersService(): UsersService {
    return this._usersService;
  }

  private static _instance: ServiceContainer;
  private _usersService: UsersService;
}
