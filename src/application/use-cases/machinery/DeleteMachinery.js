export default class DeleteMachinery {
  constructor(machineryRepository) {
    this.machineryRepository = machineryRepository;
  }

  async execute(id) {
    return await this.machineryRepository.delete(id);
  }
}