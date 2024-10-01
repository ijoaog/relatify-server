import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MonitoringReport } from './../../anklet_monitoring/entities/anklet_monitoring.entity';

@Entity('detainee')
export class Detainee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name', type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'varchar', length: 11 })
  cpf: string;

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: Date;

  @Column({ name: 'case_number', type: 'varchar', length: 100 })
  caseNumber: string;

  @Column({ name: 'prison_id', type: 'int' })
  prisonId: number;

  @Column({
    name: 'monitoring_status',
    type: 'enum',
    enum: ['pendente', 'em_monitoramento', 'concluído'],
    default: 'pendente',
  })
  monitoringStatus: 'pendente' | 'em_monitoramento' | 'concluído';

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(
    () => MonitoringReport,
    (monitoringReport) => monitoringReport.detainee,
  )
  monitoringReports: MonitoringReport[];
}
