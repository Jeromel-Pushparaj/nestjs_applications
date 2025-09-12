import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSensorCommand } from '../delete-sensor.command';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Sensor } from '../../sensor.entity';

@CommandHandler(DeleteSensorCommand)
export class DeleteSensorHandler implements ICommandHandler<DeleteSensorCommand> {

constructor(
  @InjectRepository(Sensor)
  private readonly repo: Repository<Sensor>,
) {}

  async execute(command: DeleteSensorCommand) {
    return this.repo.delete(command.id);
  }
}
