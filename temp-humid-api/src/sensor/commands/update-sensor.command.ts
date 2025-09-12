export class UpdateSensorCommand {
  constructor(
    public readonly id: number,
    public readonly temperature: number,
    public readonly humidity: number,
    public readonly data_time: Date,
  ) {}
}
