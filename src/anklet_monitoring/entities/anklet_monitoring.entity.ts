import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './../../users/entities/user.entity'; // Importe sua entidade de usuário
import { Detainee } from './../../monitored_individuals/entities/monitored_individual.entity'; // Importe sua entidade de prisioneiro

@Entity('monitoring_reports')
export class MonitoringReport {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'user_id' }) // Nome da coluna na tabela
  user: User;

  @ManyToOne(() => Detainee, (detainee) => detainee.monitoringReports, {
    eager: true,
  }) // Relacionamento com a entidade Prisoner
  @JoinColumn({ name: 'prisoner_id' }) // Nome da coluna na tabela
  detainee: Detainee;

  @Column({ name: 'device_serial', type: 'varchar', length: 100 })
  deviceSerial: string;

  @Column({ name: 'install_date', type: 'date' })
  installDate: Date;

  @Column({ name: 'removal_date', type: 'date', nullable: true })
  removalDate?: Date;

  @Column({
    type: 'enum',
    enum: ['ativo', 'removido', 'violado'],
    default: 'ativo',
  })
  status: 'ativo' | 'removido' | 'violado';

  @Column({ type: 'varchar', length: 255, nullable: true })
  location?: string;

  @Column({ name: 'last_violation', type: 'timestamp', nullable: true })
  lastViolation?: Date;

  @Column({ type: 'text', nullable: true })
  alerts?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
