export default class GetMachineryById {
  constructor(machineryRepository) {
    this.machineryRepository = machineryRepository;
  }

  async execute(id) {
    return await this.machineryRepository.findById(id);
  }
}