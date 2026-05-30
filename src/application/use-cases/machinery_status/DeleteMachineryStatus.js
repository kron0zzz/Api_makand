export default class DeleteMachineryStatus {
  constructor(machineryStatusRepository) {
    this.machineryStatusRepository = machineryStatusRepository;
  }

  async execute(id) {
    return await this.machineryStatusRepository.delete(id);
  }
}