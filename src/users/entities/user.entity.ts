import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'USER_LOGIN', unique: true })
  login: string;

  @Column({ name: 'USER_PASSWORD' })
  password: string;

  @Column({ name: 'USER_EMAIL', unique: true })
  email: string;

  @Column({ name: 'USER_NAME' })
  name: string;

  @Column({ name: 'USER_ROLE' })
  role: string; // 'admin' ou 'user'
}
