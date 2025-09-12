import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSensorCommand } from '../update-sensor.command';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Sensor } from '../../sensor.entity';

@CommandHandler(UpdateSensorCommand)
export class UpdateSensorHandler implements ICommandHandler<UpdateSensorCommand> {

constructor(
  @InjectRepository(Sensor)
  private readonly repo: Repository<Sensor>,
) {}

  async execute(command: UpdateSensorCommand) {
    const { id, ...updateData } = command;
    return this.repo.update(id, updateData);
  }
}
