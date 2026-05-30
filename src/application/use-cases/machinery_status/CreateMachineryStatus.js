export default class CreateMachineryStatus {
  constructor(machineryStatusRepository) {
    this.machineryStatusRepository = machineryStatusRepository;
  }

  async execute(statusData) {
    return await this.machineryStatusRepository.create(statusData);
  }
}