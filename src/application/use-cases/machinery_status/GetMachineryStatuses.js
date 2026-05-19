export default class GetMachineryStatuses {
  constructor(machineryStatusRepository) {
    this.machineryStatusRepository = machineryStatusRepository;
  }

  async execute() {
    return await this.machineryStatusRepository.findAll();
  }
}