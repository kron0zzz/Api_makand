export default class GetMachineries {
  constructor(machineryRepository) {
    this.machineryRepository = machineryRepository;
  }

  async execute() {
    return await this.machineryRepository.findAll();
  }
}