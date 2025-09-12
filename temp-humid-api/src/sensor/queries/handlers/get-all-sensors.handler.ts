// src/sensor/queries/handlers/get-all-sensors.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllSensorsQuery } from '../get-all-sensors.query';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Sensor } from '../../sensor.entity';

@QueryHandler(GetAllSensorsQuery)
export class GetAllSensorsHandler implements IQueryHandler<GetAllSensorsQuery> {

constructor(
  @InjectRepository(Sensor)
  private readonly repo: Repository<Sensor>,
) {}

  execute() {
    return this.repo.find();
  }
}
