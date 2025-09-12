// src/sensor/commands/handlers/create-sensor.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSensorCommand } from '../create-sensor.command';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Sensor } from '../../sensor.entity';

@CommandHandler(CreateSensorCommand)
export class CreateSensorHandler implements ICommandHandler<CreateSensorCommand> {

constructor(
  @InjectRepository(Sensor)
  private readonly repo: Repository<Sensor>,
) {}

  async execute(command: CreateSensorCommand) {
    const entity = this.repo.create(command);
    return this.repo.save(entity);
  }
}
