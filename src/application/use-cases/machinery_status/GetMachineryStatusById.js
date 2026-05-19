export default class GetMachineryStatusById {
  constructor(machineryStatusRepository) {
    this.machineryStatusRepository = machineryStatusRepository;
  }

  async execute(id) {
    return await this.machineryStatusRepository.findById(id);
  }
}