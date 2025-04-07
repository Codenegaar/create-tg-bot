import { ObjectLiteral, Repository } from 'typeorm';

export type MockRepository<T extends ObjectLiteral = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

export function createMockRepository<T extends ObjectLiteral = any>(): MockRepository<T> {
  return {
    findOne: jest.fn(),
    update: jest.fn(),
    save: jest.fn(),
  };
}
