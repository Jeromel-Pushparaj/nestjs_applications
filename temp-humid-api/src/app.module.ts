import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { SensorModule } from './sensor/sensor.module';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'sensor_data',
      autoLoadEntities: true,
      synchronize: true, // (dev only)
    }),
    SensorModule,
  ],
})
export class AppModule {}
