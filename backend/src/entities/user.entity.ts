import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  // @Column() why this give error
  @Column({ nullable: true })
  file: string;
}
