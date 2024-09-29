import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users') // Nome da tabela no banco de dados
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({ type: 'enum', enum: ['admin', 'official_agent'], nullable: false })
  role: 'admin' | 'official_agent';

  @Column({ type: 'varchar', length: 50, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  district: string;

  // Adicione a coluna CPF
  @Column({ type: 'varchar', length: 11, unique: true, nullable: false })
  cpf: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
