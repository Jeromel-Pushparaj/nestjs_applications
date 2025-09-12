// src/sensor/sensor.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Sensor } from './sensor.entity';
import { SensorController } from './sensor.controller';
import { CreateSensorHandler } from './commands/handlers/create-sensor.handler';
import { DeleteSensorHandler } from './commands/handlers/delete-sensor.handler';
import { UpdateSensorHandler } from './commands/handlers/update-sensor.handler';
import { GetAllSensorsHandler } from './queries/handlers/get-all-sensors.handler';
import { GetSensorHandler } from './queries/handlers/get-sensors.handler';

const QueryHandlers = [
    GetAllSensorsHandler, 
    GetSensorHandler
];
const CommandHandlers = [
  CreateSensorHandler,
  UpdateSensorHandler,
  DeleteSensorHandler,
];
@Module({
  imports: [TypeOrmModule.forFeature([Sensor]), CqrsModule],
  controllers: [SensorController],
  providers: [ ...CommandHandlers, ...QueryHandlers],
})
export class SensorModule {}
