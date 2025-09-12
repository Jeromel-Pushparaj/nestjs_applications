// src/sensor/commands/create-sensor.command.ts
export class CreateSensorCommand {
  constructor(
    public readonly temperature: number,
    public readonly humidity: number,
    public readonly data_time: Date,
  ) {}
}
