// src/sensor/sensor.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, Res } from '@nestjs/common';
import type { Response } from 'express';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSensorCommand } from './commands/create-sensor.command';
import { GetAllSensorsQuery } from './queries/get-all-sensors.query';
import { GetSensorQuery } from './queries/get-sensor.query';
import { DeleteSensorCommand } from './commands/delete-sensor.command';
import { UpdateSensorCommand } from './commands/update-sensor.command';

@Controller('sensors')
export class SensorController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  findAll() {
    return this.queryBus.execute(new GetAllSensorsQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.queryBus.execute(new GetSensorQuery(id));
  }

  @Post()
  create(@Body() dto: any) {
    return this.commandBus.execute(
      new CreateSensorCommand(dto.temperature, dto.humidity, dto.data_time),
    );
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: any, @Res() res: Response) {
    // call UpdateSensorCommand
    const result = await this.commandBus.execute(
      new UpdateSensorCommand(id, dto.temperature, dto.humidity, dto.data_time)
    );
    if (result && result.affected) {
      res.status(204).send();
    } else {
      res.status(400).send();
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    // would call DeleteSensorCommand
    return this.commandBus.execute(
        new DeleteSensorCommand(id)
    );
  }
}
