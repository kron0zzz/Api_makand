export default class UpdateMachineryStatus {
  constructor(machineryStatusRepository) {
    this.machineryStatusRepository = machineryStatusRepository;
  }

  async execute(id, statusData) {
    return await this.machineryStatusRepository.update(id, statusData);
  }
}