import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSensorQuery } from '../get-sensor.query';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Sensor } from '../../sensor.entity';

@QueryHandler(GetSensorQuery)
export class GetSensorHandler implements IQueryHandler<GetSensorQuery> {

constructor(
  @InjectRepository(Sensor)
  private readonly repo: Repository<Sensor>,
) {}

  async execute(query: GetSensorQuery): Promise<Sensor | null> {
    return this.repo.findOne({
      where: { id: query.id },
    });
  }
}
