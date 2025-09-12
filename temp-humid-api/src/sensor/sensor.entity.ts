// src/sensor/sensor.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('temp_humid_sensor')
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', { precision: 5, scale: 2 })
  temperature: number;

  @Column('numeric', { precision: 5, scale: 2 })
  humidity: number;

  @Column({ type: 'timestamp' })
  data_time: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
