export default class GetMachineryById {
  constructor(machineryRepository) {
    this.machineryRepository = machineryRepository;
  }

  async execute(id) {
    const machinery = await this.machineryRepository.findByIdWithStock(id);
    return machinery;
  }
}