import { Column, Entity, PrimaryColumn } from 'typeorm';
import { State } from '../services/users/state.enum';

@Entity()
export class User {
  @PrimaryColumn({ type: 'bigint' })
  id!: number;

  @Column({ type: 'enum', enum: State })
  state!: State;
}
